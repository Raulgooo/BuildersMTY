import math
from datetime import datetime, timezone
from buildersmty_backend.schemas.user import UserData, ScoringResult

# Systems-level languages that indicate depth
SYSTEMS_LANGUAGES = {"C", "C++", "Rust", "Go", "Zig", "Assembly", "D"}
HIGH_LEVEL_LANGUAGES = {"Python", "JavaScript", "TypeScript", "Ruby", "PHP", "Java", "C#", "Kotlin", "Swift", "Dart"}

# Common fork/tutorial patterns in repo names
FORK_PATTERNS = {"fork", "tutorial", "course", "exercise", "homework", "assignment", "copy", "clone", "example", "demo", "test", "dotfiles"}


def _shannon_entropy(distribution: dict[str, int]) -> float:
    """Calculate Shannon entropy of a language distribution."""
    total = sum(distribution.values())
    if total == 0:
        return 0.0
    entropy = 0.0
    for count in distribution.values():
        if count > 0:
            p = count / total
            entropy -= p * math.log2(p)
    return entropy


def _is_original_project(repo) -> bool:
    """Heuristic: is this repo likely an original project (not a fork/tutorial/org)?"""
    # Actual GitHub forks are never original
    if getattr(repo, "is_fork", False):
        return False
    # Org repos are not personal projects
    if getattr(repo, "is_org_repo", False):
        return False
    name_lower = repo.name.lower()
    if any(pattern in name_lower for pattern in FORK_PATTERNS):
        return False
    if repo.description and len(repo.description) > 10:
        return True
    if repo.stargazers_count > 0 or repo.forks_count > 0:
        return True
    return False


def _days_since(date_str: str) -> int:
    """Days between a date string and now."""
    try:
        dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
        return (datetime.now(timezone.utc) - dt).days
    except (ValueError, TypeError):
        return 9999


def _score_repository_impact(user_data: UserData) -> tuple[float, list[str]]:
    """A. Repository Impact Score (max 25pts)"""
    score = 0.0
    highlights = []

    # Stars with logarithmic scaling (max 10)
    star_score = min(10.0, math.log2(user_data.total_stars + 1) * 1.5)
    score += star_score

    # Fork impact — others building on your work (max 5)
    total_forks = sum(r.forks_count for r in user_data.repositories)
    fork_score = min(5.0, total_forks * 0.5)
    score += fork_score

    # Non-trivial repos: >5 stars OR >2 forks (max 10)
    nontrivial = sum(
        1 for r in user_data.repositories
        if r.stargazers_count > 5 or r.forks_count > 2
    )
    nontrivial_score = min(10.0, nontrivial * 2.0)
    score += nontrivial_score

    if user_data.total_stars > 50:
        highlights.append(f"{user_data.total_stars} estrellas totales en GitHub")
    if nontrivial >= 3:
        highlights.append(f"{nontrivial} repositorios con tracción real")

    return min(25.0, score), highlights


def _score_technical_breadth(user_data: UserData) -> tuple[float, list[str]]:
    """B. Technical Breadth & Depth (max 20pts)"""
    score = 0.0
    highlights = []
    languages = user_data.top_languages

    if not languages:
        return 0.0, highlights

    unique_count = len(languages)

    # Language count with diminishing returns (max 8)
    lang_score = min(8.0, unique_count * 2.0)
    score += lang_score

    # Shannon entropy of distribution (max 6)
    entropy = _shannon_entropy(languages)
    entropy_score = min(6.0, entropy * 3.0)
    score += entropy_score

    # Has systems language (max 3)
    lang_names = set(languages.keys())
    has_systems = bool(lang_names & SYSTEMS_LANGUAGES)
    if has_systems:
        score += 3.0
        highlights.append(f"Domina lenguajes de sistemas: {', '.join(lang_names & SYSTEMS_LANGUAGES)}")

    # Has both low-level and high-level (max 3)
    has_high_level = bool(lang_names & HIGH_LEVEL_LANGUAGES)
    if has_systems and has_high_level:
        score += 3.0
        highlights.append("Versatilidad: combina lenguajes de bajo y alto nivel")

    return min(20.0, score), highlights


def _score_consistency(user_data: UserData) -> tuple[float, list[str]]:
    """C. Consistency & Activity (max 20pts)"""
    score = 0.0
    highlights = []

    repos = user_data.repositories
    if not repos:
        return 0.0, highlights

    # Repo recency: updated in last 90 days (max 5)
    recent_repos = sum(1 for r in repos if _days_since(r.updated_at) <= 90)
    recency_score = min(5.0, recent_repos * 1.5)
    score += recency_score

    # Total repo count with log scale (max 3)
    total_repos = len(repos)
    repo_count_score = min(3.0, math.log2(total_repos + 1) * 1.0)
    score += repo_count_score

    # Commit volume with log scale (max 5)
    if user_data.total_commits > 0:
        commit_score = min(5.0, math.log2(user_data.total_commits + 1) * 0.7)
        score += commit_score
        if user_data.total_commits >= 500:
            highlights.append(f"{user_data.total_commits} commits en el último año")

    # PR activity (max 3)
    if user_data.total_prs > 0:
        pr_score = min(3.0, math.log2(user_data.total_prs + 1) * 0.8)
        score += pr_score
        if user_data.total_prs >= 20:
            highlights.append(f"{user_data.total_prs} pull requests creados")

    # Long-term builder: has repos older than 365 days AND recent repos (max 4)
    has_old = any(_days_since(r.updated_at) > 365 for r in repos)
    has_recent = recent_repos > 0
    if has_old and has_recent:
        score += 4.0
        highlights.append("Builder de largo plazo: actividad sostenida por más de un año")

    if recent_repos >= 5:
        highlights.append(f"{recent_repos} repositorios actualizados en los últimos 90 días")

    return min(20.0, score), highlights


def _score_open_source(user_data: UserData) -> tuple[float, list[str]]:
    """D. Open Source & Community Signal (max 20pts)"""
    score = 0.0
    highlights = []

    repos = user_data.repositories
    total_repos = len(repos) if repos else 1

    # Public repo ratio (max 8)
    public_ratio = user_data.public_repos_count / max(total_repos, 1)
    score += public_ratio * 8.0

    # Has repos with descriptions (max 4)
    described = sum(1 for r in repos if r.description and len(r.description) > 5)
    desc_ratio = described / max(total_repos, 1)
    score += desc_ratio * 4.0

    # Polyglot projects — repos touching multiple language ecosystems (max 4)
    unique_langs_per_repo = set()
    for r in repos:
        if r.language:
            unique_langs_per_repo.add(r.language)
    polyglot_count = len(unique_langs_per_repo)
    score += min(4.0, polyglot_count * 0.5)

    # Has popular repos >20 stars (max 4)
    popular = sum(1 for r in repos if r.stargazers_count > 20)
    if popular > 0:
        score += 4.0
        highlights.append(f"{popular} repositorio(s) con más de 20 estrellas")

    if public_ratio > 0.7:
        highlights.append("Fuerte presencia open source")

    return min(20.0, score), highlights


def _score_builder_dna(user_data: UserData) -> tuple[float, list[str]]:
    """E. Builder DNA (max 15pts) — What makes someone a builder."""
    score = 0.0
    highlights = []

    repos = user_data.repositories
    if not repos:
        return 0.0, highlights

    # Original projects (not forks/tutorials, have descriptions, some activity) (max 8)
    original = [r for r in repos if _is_original_project(r)]
    original_score = min(8.0, len(original) * 2.5)
    score += original_score

    # Repository diversity — different problem domains by language (max 4)
    domain_langs = set(r.language for r in repos if r.language)
    domain_score = min(4.0, len(domain_langs) * 1.0)
    score += domain_score

    # Has private repos — serious work, not just show (max 3)
    if user_data.private_repos_count > 0:
        score += 3.0
        highlights.append("Tiene proyectos privados (trabajo serio más allá del portfolio)")

    if len(original) >= 5:
        highlights.append(f"{len(original)} proyectos originales detectados")

    return min(15.0, score), highlights


def calculate_builder_score(user_data: UserData) -> ScoringResult:
    """
    Comprehensive multi-factor scoring algorithm for BuildersMTY.
    Returns a 0-100 score with tier assignment, breakdown, and highlights.
    """
    all_highlights: list[str] = []
    breakdown: dict[str, float] = {}

    # Calculate each dimension
    impact, h1 = _score_repository_impact(user_data)
    breadth, h2 = _score_technical_breadth(user_data)
    consistency, h3 = _score_consistency(user_data)
    opensource, h4 = _score_open_source(user_data)
    builder_dna, h5 = _score_builder_dna(user_data)

    breakdown["repository_impact"] = round(impact, 2)
    breakdown["technical_breadth"] = round(breadth, 2)
    breakdown["consistency_activity"] = round(consistency, 2)
    breakdown["open_source_signal"] = round(opensource, 2)
    breakdown["builder_dna"] = round(builder_dna, 2)

    all_highlights.extend(h1 + h2 + h3 + h4 + h5)

    total_score = round(impact + breadth + consistency + opensource + builder_dna, 2)
    total_score = min(100.0, max(0.0, total_score))

    # Tier assignment
    if total_score >= 72:
        rank = "BUILDER_LEGEND"
    elif total_score >= 40:
        rank = "ELITE_BUILDER"
    else:
        rank = "BUILDER"

    return ScoringResult(
        score=total_score,
        rank=rank,
        breakdown=breakdown,
        highlights=all_highlights[:8],  # Cap at 8 most relevant
    )
