import httpx
from typing import List, Dict, Any
from buildersmty_backend.schemas.user import UserData, RepoData

async def fetch_user_data(access_token: str) -> UserData:
    """
    Fetches comprehensive user data from GitHub using the provided access token.
    Includes public and private repositories, and basic profile info.
    """
    async with httpx.AsyncClient() as client:
        headers = {
            "Authorization": f"token {access_token}",
            "Accept": "application/vnd.github.v3+json"
        }
        
        # 1. Fetch Profile
        profile_res = await client.get("https://api.github.com/user", headers=headers)
        profile = profile_res.json()
        
        # 2. Fetch Repositories (Public & Private)
        # Note: per_page=100 for simplicity, pagination might be needed for large profiles
        repos_res = await client.get("https://api.github.com/user/repos?per_page=100&visibility=all", headers=headers)
        repos = repos_res.json()
        
        repo_list = []
        total_stars = 0
        languages = {}
        private_count = 0
        public_count = 0
        
        for r in repos:
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
            
            if r["private"]:
                private_count += 1
            else:
                public_count += 1
                
            lang = r.get("language")
            if lang:
                languages[lang] = languages.get(lang, 0) + 1
        
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
            top_languages=dict(sorted(languages.items(), key=lambda item: item[1], reverse=True)[:5]),
            repositories=repo_list
        )
        
        return user_data