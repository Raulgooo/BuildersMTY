import httpx
from buildersmty_backend.schemas.user import UserData, RepoData

GRAPHQL_URL = "https://api.github.com/graphql"

# Main query: profile + contributions + owned repos (paginated)
PROFILE_QUERY = """
query($reposCursor: String) {
  viewer {
    id
    databaseId
    login
    avatarUrl
    email
    bio
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      totalIssueContributions
      totalRepositoryContributions
      contributionCalendar {
        totalContributions
      }
    }
    repositories(
      first: 100
      after: $reposCursor
      ownerAffiliations: OWNER
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        nameWithOwner
        description
        isPrivate
        url
        primaryLanguage { name }
        stargazerCount
        forkCount
        updatedAt
        isFork
        owner { login }
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          nodes { name }
        }
      }
    }
    pullRequests(states: [OPEN, CLOSED, MERGED]) {
      totalCount
    }
  }
}
"""

# Pagination-only query (skips re-fetching contributions)
REPOS_PAGE_QUERY = """
query($reposCursor: String!) {
  viewer {
    repositories(
      first: 100
      after: $reposCursor
      ownerAffiliations: OWNER
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        nameWithOwner
        description
        isPrivate
        url
        primaryLanguage { name }
        stargazerCount
        forkCount
        updatedAt
        isFork
        owner { login }
        languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
          nodes { name }
        }
      }
    }
  }
}
"""

# Repos the user contributed to but does NOT own
CONTRIBUTED_REPOS_QUERY = """
query($cursor: String) {
  viewer {
    login
    repositoriesContributedTo(
      first: 50
      after: $cursor
      contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        name
        nameWithOwner
        description
        isPrivate
        url
        primaryLanguage { name }
        stargazerCount
        forkCount
        updatedAt
        owner { login }
      }
    }
  }
}
"""


async def _graphql_request(client: httpx.AsyncClient, headers: dict, query: str, variables: dict | None = None) -> dict:
    """Execute a GitHub GraphQL request."""
    payload = {"query": query}
    if variables:
        payload["variables"] = variables

    res = await client.post(GRAPHQL_URL, json=payload, headers=headers)
    res.raise_for_status()
    data = res.json()

    if "errors" in data:
        error_msgs = "; ".join(e.get("message", "") for e in data["errors"])
        raise RuntimeError(f"GitHub GraphQL errors: {error_msgs}")

    return data["data"]


async def fetch_user_data(access_token: str) -> UserData:
    """
    Fetches comprehensive user data from GitHub using the GraphQL API.
    Separates personal repos from org repos and forks.
    """
    async with httpx.AsyncClient(timeout=30.0) as client:
        headers = {
            "Authorization": f"bearer {access_token}",
            "Content-Type": "application/json",
        }

        # 1. Fetch profile + first page of owned repos + contributions
        data = await _graphql_request(client, headers, PROFILE_QUERY)
        viewer = data["viewer"]
        username = viewer["login"]

        # Paginate owned repos (up to 300) using lightweight query
        all_repo_nodes = list(viewer["repositories"]["nodes"])
        page_info = viewer["repositories"]["pageInfo"]
        pages_fetched = 1

        while page_info["hasNextPage"] and pages_fetched < 3:
            data_page = await _graphql_request(
                client, headers, REPOS_PAGE_QUERY,
                variables={"reposCursor": page_info["endCursor"]},
            )
            page_nodes = data_page["viewer"]["repositories"]["nodes"]
            all_repo_nodes.extend(page_nodes)
            page_info = data_page["viewer"]["repositories"]["pageInfo"]
            pages_fetched += 1

        # 2. Fetch contributed repos (repos user does NOT own)
        contrib_data = await _graphql_request(client, headers, CONTRIBUTED_REPOS_QUERY)
        contrib_nodes_raw = contrib_data["viewer"]["repositoriesContributedTo"]["nodes"]

        contrib_page_info = contrib_data["viewer"]["repositoriesContributedTo"]["pageInfo"]
        if contrib_page_info["hasNextPage"]:
            contrib_page2 = await _graphql_request(
                client, headers, CONTRIBUTED_REPOS_QUERY,
                variables={"cursor": contrib_page_info["endCursor"]},
            )
            contrib_nodes_raw.extend(
                contrib_page2["viewer"]["repositoriesContributedTo"]["nodes"]
            )

        # Filter contributed: only repos where user is NOT the owner
        contrib_nodes = [
            r for r in contrib_nodes_raw
            if r["owner"]["login"].lower() != username.lower()
        ]

        # 3. Process owned repos — separate personal repos from org repos and forks
        repo_list = []
        total_stars = 0
        total_forks = 0
        languages: dict[str, int] = {}
        private_count = 0
        public_count = 0

        for r in all_repo_nodes:
            owner_login = r["owner"]["login"]
            is_personal = owner_login.lower() == username.lower()
            is_fork = r.get("isFork", False)
            primary_lang = r["primaryLanguage"]["name"] if r["primaryLanguage"] else None

            repo_data = RepoData(
                name=r["name"],
                full_name=r["nameWithOwner"],
                description=r.get("description"),
                is_private=r["isPrivate"],
                html_url=r["url"],
                language=primary_lang,
                stargazers_count=r["stargazerCount"],
                forks_count=r["forkCount"],
                updated_at=r["updatedAt"],
                is_fork=is_fork,
                is_org_repo=not is_personal,
            )
            repo_list.append(repo_data)

            # Only count stars/forks from personal non-fork repos
            if is_personal and not is_fork:
                total_stars += r["stargazerCount"]
                total_forks += r["forkCount"]

            if r["isPrivate"]:
                private_count += 1
            else:
                public_count += 1

            # Count languages from all repos (including org)
            if primary_lang:
                languages[primary_lang] = languages.get(primary_lang, 0) + 1
            for lang_node in r.get("languages", {}).get("nodes", []):
                lang_name = lang_node["name"]
                if lang_name != primary_lang:
                    languages[lang_name] = languages.get(lang_name, 0) + 1

        # 4. Process contributed repos
        contributed_list = []
        for r in contrib_nodes:
            primary_lang = r["primaryLanguage"]["name"] if r["primaryLanguage"] else None
            contributed_list.append(RepoData(
                name=r["name"],
                full_name=r["nameWithOwner"],
                description=r.get("description"),
                is_private=r["isPrivate"],
                html_url=r["url"],
                language=primary_lang,
                stargazers_count=r["stargazerCount"],
                forks_count=r["forkCount"],
                updated_at=r["updatedAt"],
                is_fork=False,
                is_org_repo=True,
            ))
            if primary_lang:
                languages[primary_lang] = languages.get(primary_lang, 0) + 1

        # Sort languages
        sorted_langs = dict(sorted(languages.items(), key=lambda item: item[1], reverse=True))
        top_languages = dict(list(sorted_langs.items())[:10])
        language_tags = list(sorted_langs.keys())

        # Contribution stats (last year for commits, all-time for PRs)
        contributions = viewer["contributionsCollection"]
        total_commits = contributions["totalCommitContributions"]
        total_prs = viewer["pullRequests"]["totalCount"]

        user_data = UserData(
            github_id=viewer["databaseId"],
            username=username,
            avatar_url=viewer["avatarUrl"],
            email=viewer.get("email"),
            bio=viewer.get("bio"),
            public_repos_count=public_count,
            private_repos_count=private_count,
            total_stars=total_stars,
            total_forks=total_forks,
            total_commits=total_commits,
            total_prs=total_prs,
            top_languages=top_languages,
            language_tags=language_tags,
            repositories=repo_list,
            contributed_repos=contributed_list,
        )

        return user_data
