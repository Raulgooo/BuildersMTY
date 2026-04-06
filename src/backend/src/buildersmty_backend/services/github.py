import httpx
from buildersmty_backend.schemas.user import UserData, RepoData


async def fetch_user_data(access_token: str) -> UserData:
    """
    Fetches comprehensive user data from GitHub using the provided access token.
    Includes public and private repositories with pagination support.
    """
    async with httpx.AsyncClient() as client:
        headers = {
            "Authorization": f"token {access_token}",
            "Accept": "application/vnd.github.v3+json"
        }

        # 1. Fetch Profile
        profile_res = await client.get("https://api.github.com/user", headers=headers)
        profile_res.raise_for_status()
        profile = profile_res.json()

        # 2. Fetch Repositories with pagination (up to 300 repos)
        all_repos = []
        page = 1
        while page <= 3:  # Max 3 pages × 100 = 300 repos
            repos_res = await client.get(
                f"https://api.github.com/user/repos?per_page=100&visibility=all&sort=updated&page={page}",
                headers=headers,
            )
            repos_res.raise_for_status()
            repos = repos_res.json()
            if not repos or not isinstance(repos, list):
                break
            all_repos.extend(repos)
            if len(repos) < 100:
                break
            page += 1

        repo_list = []
        total_stars = 0
        total_forks = 0
        languages = {}
        private_count = 0
        public_count = 0

        for r in all_repos:
            repo_data = RepoData(
                name=r["name"],
                full_name=r["full_name"],
                description=r.get("description"),
                is_private=r["private"],
                html_url=r["html_url"],
                language=r.get("language"),
                stargazers_count=r["stargazers_count"],
                forks_count=r["forks_count"],
                updated_at=r["updated_at"]
            )
            repo_list.append(repo_data)
            total_stars += r["stargazers_count"]
            total_forks += r["forks_count"]

            if r["private"]:
                private_count += 1
            else:
                public_count += 1

            lang = r.get("language")
            if lang:
                languages[lang] = languages.get(lang, 0) + 1

        # Sort languages by count and take top entries
        sorted_langs = dict(sorted(languages.items(), key=lambda item: item[1], reverse=True))
        top_languages = dict(list(sorted_langs.items())[:10])
        language_tags = list(sorted_langs.keys())

        # 3. Construct UserData
        user_data = UserData(
            github_id=profile["id"],
            username=profile["login"],
            avatar_url=profile["avatar_url"],
            email=profile.get("email"),
            bio=profile.get("bio"),
            public_repos_count=public_count,
            private_repos_count=private_count,
            total_stars=total_stars,
            total_forks=total_forks,
            top_languages=top_languages,
            language_tags=language_tags,
            repositories=repo_list
        )

        return user_data
