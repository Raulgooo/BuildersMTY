import os
import json
from openai import AsyncOpenAI
from dotenv import load_dotenv
from buildersmty_backend.schemas.user import UserData, ScoringResult, BuilderAnalysis

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")

client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

BUILDER_ANALYSIS_SCHEMA = {
    "type": "json_schema",
    "json_schema": {
        "name": "BuilderAnalysis",
        "strict": True,
        "schema": {
            "type": "object",
            "properties": {
                "summary": {
                    "type": "string",
                    "description": "2-3 sentence developer profile summary in Spanish"
                },
                "strengths": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Top 3 strengths of this developer"
                },
                "recommendations": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Top 3 growth areas / recommendations"
                },
                "developer_archetype": {
                    "type": "string",
                    "description": "Developer archetype label, e.g. Full-Stack Builder, Systems Hacker, Frontend Artisan"
                },
                "notable_projects": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Top 3 repository names worth highlighting"
                },
                "llm_rating": {
                    "type": "integer",
                    "description": "Qualitative rating 1-5 of this developer's overall profile. 1=beginner with minimal activity, 2=early builder, 3=solid developer, 4=strong builder with real impact, 5=exceptional developer with outstanding portfolio"
                }
            },
            "required": ["summary", "strengths", "recommendations", "developer_archetype", "notable_projects", "llm_rating"],
            "additionalProperties": False
        }
    }
}

SYSTEM_PROMPT = """Eres el motor de análisis técnico de BuildersMTY — una comunidad de élite para developers en Monterrey, México. Tu trabajo es leer un perfil de GitHub y producir un análisis estructurado que sirva para categorizar y onboardear al developer.

## Tu proceso de razonamiento (hazlo internamente, NO lo incluyas en el output)
1. Lee las métricas brutas y los repos para inferir patrones reales de trabajo.
2. Determina el arquetipo ANTES de escribir las fortalezas — el arquetipo guía el tono del análisis.
3. Las fortalezas deben ser específicas y evidenciadas (citar repo o métrica), no genéricas.
4. Las recomendaciones deben ser accionables para alguien en una comunidad de builders, no consejos de carrera genéricos.
5. El resumen debe sonar como lo escribiría un tech lead que leyó el perfil, no un bot.
6. Si hay un README de perfil, úsalo para entender mejor quién es el developer — su narrativa, intereses y cómo se presenta.

## Arquetipos disponibles
- Systems Hacker        → bajo nivel, kernels, optimización, C, C++, Rust, Go
- Full-Stack Builder    → apps completas, integración end-to-end, velocidad de entrega
- Frontend Artisan      → UI/UX, animaciones, design systems, accesibilidad
- Backend Engineer      → APIs, bases de datos, arquitectura de servicios
- Data Engineer         → pipelines, ML, análisis, visualización
- DevOps/Infra          → CI/CD, containers, IaC, observabilidad
- Security Researcher   → pentesting, auditorías, CVEs, hardening
- Mobile Developer      → iOS/Android/React Native/Flutter
- Open Source Champion  → contribuciones externas, mantenimiento de libs propias
- Founder Builder       → proyectos con tracción real (stars, forks, usuarios)
- AI/ML Engineer        → modelos, entrenamiento, inferencia, pipelines de datos

## Calificación cualitativa (llm_rating)
Asigna un rating del 1 al 5 evaluando la calidad general del perfil:
Evalúa: originalidad de proyectos, calidad del README de perfil, coherencia del stack, impacto real, y si el perfil refleja a alguien que genuinamente construye cosas.

Responde ÚNICAMENTE con el JSON del schema solicitado, sin markdown, sin texto extra."""


def _build_user_prompt(user_data: UserData, scoring: ScoringResult) -> str:
    repos_summary = []
    for r in user_data.repositories[:20]:
        repos_summary.append(
            f"- {r.name}: {r.language or 'N/A'}, "
            f"{'privado' if r.is_private else 'público'}, "
            f"{r.stargazers_count}★, {r.forks_count} forks, "
            f"desc: {r.description or 'sin descripción'}"
        )

    repos_text = "\n".join(repos_summary) if repos_summary else "Sin repositorios"

    # Include profile README if available
    readme_section = ""
    if user_data.readme_content:
        readme_section = f"""
## README del perfil ({user_data.username}/{user_data.username})
{user_data.readme_content}
"""

    return f"""## Input: Perfil GitHub

**Usuario:** {user_data.username}
**Bio:** {user_data.bio or '—'}
**Repos públicos:** {user_data.public_repos_count} | **Privados:** {user_data.private_repos_count}
**Estrellas totales:** {user_data.total_stars} | **Forks:** {user_data.total_forks}
**Commits último año:** {user_data.total_commits} | **PRs totales:** {user_data.total_prs}
**Top lenguajes:** {json.dumps(user_data.top_languages, ensure_ascii=False)}
{readme_section}
## Repositorios
{repos_text}

## Builder Score (pre-calculado)
- Score: {scoring.score}/100
- Rango: {scoring.rank}
- Breakdown: {json.dumps(scoring.breakdown, ensure_ascii=False)}
- Highlights: {', '.join(scoring.highlights) if scoring.highlights else 'ninguno'}

Genera el análisis siguiendo exactamente el schema estructurado."""


async def analyze_builder_profile(user_data: UserData, scoring: ScoringResult) -> BuilderAnalysis:
    """
    Uses OpenRouter (via OpenAI SDK) to generate a structured analysis of a builder's profile.
    Always uses structured outputs for reliable JSON responses.
    """
    try:
        response = await client.chat.completions.create(
            model="google/gemini-2.0-flash-001",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": _build_user_prompt(user_data, scoring)},
            ],
            response_format=BUILDER_ANALYSIS_SCHEMA,
            temperature=0.4,
            max_tokens=1000,
        )
        content = response.choices[0].message.content
        return BuilderAnalysis.model_validate_json(content)
    except Exception as e:
        print(f"LLM analysis failed: {e}")
        return BuilderAnalysis(
            summary=f"{user_data.username} es un desarrollador con {user_data.public_repos_count} repositorios públicos y experiencia en {', '.join(list(user_data.top_languages.keys())[:3]) or 'varios lenguajes'}.",
            strengths=[
                f"Experiencia en {list(user_data.top_languages.keys())[0]}" if user_data.top_languages else "En desarrollo",
                f"{user_data.total_stars} estrellas en sus proyectos" if user_data.total_stars > 0 else "Construyendo portfolio",
                f"Rango {scoring.rank} en BuildersMTY"
            ],
            recommendations=[
                "Contribuir a más proyectos open source",
                "Diversificar el stack tecnológico",
                "Documentar proyectos con READMEs detallados"
            ],
            developer_archetype="Builder en Desarrollo",
            notable_projects=[r.name for r in user_data.repositories[:3]],
            llm_rating=3,
        )
