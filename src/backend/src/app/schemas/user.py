from pydantic import BaseModel, Field
from typing import List, Optional, Dict

class RepoData(BaseModel):
    name: str
    full_name: str
    description: Optional[str] = None
    is_private: bool
    html_url: str
    language: Optional[str] = None
    stargazers_count: int
    forks_count: int
    updated_at: str

class UserData(BaseModel):
    github_id: int
    username: str
    avatar_url: str
    email: Optional[str] = None
    bio: Optional[str] = None
    
    # Statistics
    public_repos_count: int = 0
    private_repos_count: int = 0
    total_stars: int = 0
    total_commits: int = 0
    total_prs: int = 0
    
    # Skills & Data
    top_languages: Dict[str, int] = Field(default_factory=dict)
    repositories: List[RepoData] = Field(default_factory=list)
    
    # Extension for scoring
    score: float = 0.0
    rank: Optional[str] = None
