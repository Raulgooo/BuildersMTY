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
    is_fork: bool = False
    is_org_repo: bool = False


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
    total_forks: int = 0
    total_commits: int = 0
    total_prs: int = 0

    # Skills & Data
    top_languages: Dict[str, int] = Field(default_factory=dict)
    language_tags: List[str] = Field(default_factory=list)
    repositories: List[RepoData] = Field(default_factory=list)
    contributed_repos: List[RepoData] = Field(default_factory=list)

    # Profile README (username/username repo)
    readme_content: Optional[str] = None

    # Extension for scoring
    score: float = 0.0
    rank: Optional[str] = None


class ScoringResult(BaseModel):
    score: float
    rank: str  # BUILDER | ELITE_BUILDER | BUILDER_LEGEND
    breakdown: Dict[str, float] = Field(default_factory=dict)
    highlights: List[str] = Field(default_factory=list)


class BuilderAnalysis(BaseModel):
    summary: str
    strengths: List[str]
    recommendations: List[str]
    developer_archetype: str
    notable_projects: List[str]
    llm_rating: int = 3  # 1-5 qualitative rating from LLM
