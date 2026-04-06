import httpx
from buildersmty_backend.schemas.user import UserData, RepoData

GRAPHQL_URL = "https://api.github.com/graphql"

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
    Gets profile, repositories, commits, PRs, and contribution stats in minimal API calls.
    """
    async with httpx.AsyncClient(timeout=30.0) as client:
        headers = {
            "Authorization": f"bearer {access_token}",
            "Content-Type": "application/json",
        }

        # First page of repos + profile + contributions
        data = await _graphql_request(client, headers, PROFILE_QUERY)
        viewer = data["viewer"]

        # Collect repos across pages (up to 3 pages = 300 repos)
        all_repo_nodes = list(viewer["repositories"]["nodes"])
        page_info = viewer["repositories"]["pageInfo"]
        pages_fetched = 1

        while page_info["hasNextPage"] and pages_fetched < 3:
            data_page = await _graphql_request(
                client, headers, PROFILE_QUERY,
                variables={"reposCursor": page_info["endCursor"]},
            )
            page_nodes = data_page["viewer"]["repositories"]["nodes"]
            all_repo_nodes.extend(page_nodes)
            page_info = data_page["viewer"]["repositories"]["pageInfo"]
            pages_fetched += 1

        # Process repos
        repo_list = []
        total_stars = 0
        total_forks = 0
        languages: dict[str, int] = {}
        private_count = 0
        public_count = 0

        for r in all_repo_nodes:
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
            )
            repo_list.append(repo_data)
            total_stars += r["stargazerCount"]
            total_forks += r["forkCount"]

            if r["isPrivate"]:
                private_count += 1
            else:
                public_count += 1

            # Count all languages from each repo
            if primary_lang:
                languages[primary_lang] = languages.get(primary_lang, 0) + 1
            for lang_node in r.get("languages", {}).get("nodes", []):
                lang_name = lang_node["name"]
                if lang_name != primary_lang:
                    languages[lang_name] = languages.get(lang_name, 0) + 1

        # Sort languages
        sorted_langs = dict(sorted(languages.items(), key=lambda item: item[1], reverse=True))
        top_languages = dict(list(sorted_langs.items())[:10])
        language_tags = list(sorted_langs.keys())

        # Extract contribution stats
        contributions = viewer["contributionsCollection"]
        total_commits = contributions["totalCommitContributions"]
        total_prs = viewer["pullRequests"]["totalCount"]

        user_data = UserData(
            github_id=viewer["databaseId"],
            username=viewer["login"],
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
        )

        return user_data
