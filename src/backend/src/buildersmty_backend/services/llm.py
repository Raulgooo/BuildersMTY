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
                }
            },
            "required": ["summary", "strengths", "recommendations", "developer_archetype", "notable_projects"],
            "additionalProperties": False
        }
    }
}


def _build_prompt(user_data: UserData, scoring: ScoringResult) -> str:
    repos_summary = []
    for r in user_data.repositories[:20]:  # Limit to top 20 repos for context
        repos_summary.append(
            f"- {r.name}: {r.language or 'N/A'}, "
            f"{'privado' if r.is_private else 'público'}, "
            f"{r.stargazers_count}★, {r.forks_count} forks, "
            f"desc: {r.description or 'sin descripción'}"
        )

    repos_text = "\n".join(repos_summary) if repos_summary else "Sin repositorios"

    return f"""Eres un analista técnico de BuildersMTY, una comunidad de desarrolladores en Monterrey, México.
Analiza el siguiente perfil de GitHub y genera un análisis profesional EN ESPAÑOL.

## Perfil de GitHub
- Usuario: {user_data.username}
- Bio: {user_data.bio or 'Sin bio'}
- Repos públicos: {user_data.public_repos_count}
- Repos privados: {user_data.private_repos_count}
- Estrellas totales: {user_data.total_stars}
- Forks totales: {user_data.total_forks}
- Top lenguajes: {json.dumps(user_data.top_languages)}

## Repositorios
{repos_text}

## Puntuación Builder
- Score total: {scoring.score}/100
- Rango: {scoring.rank}
- Desglose: {json.dumps(scoring.breakdown)}
- Logros detectados: {', '.join(scoring.highlights) if scoring.highlights else 'Ninguno destacado'}

## Instrucciones
1. Escribe un resumen de 2-3 oraciones sobre este desarrollador (en español).
2. Lista exactamente 3 fortalezas principales.
3. Lista exactamente 3 recomendaciones de crecimiento.
4. Asigna un arquetipo de desarrollador (ej: "Full-Stack Builder", "Systems Hacker", "Frontend Artisan", "Data Engineer", "DevOps Specialist", "Security Researcher", "Mobile Developer", "Open Source Contributor").
5. Selecciona hasta 3 repositorios notables de su perfil.

Responde SOLO con el JSON estructurado."""


async def analyze_builder_profile(user_data: UserData, scoring: ScoringResult) -> BuilderAnalysis:
    """
    Uses OpenRouter (via OpenAI SDK) to generate a structured analysis of a builder's profile.
    Always uses structured outputs for reliable JSON responses.
    """
    prompt = _build_prompt(user_data, scoring)

    try:
        response = await client.chat.completions.create(
            model="google/gemini-2.0-flash-001",
            messages=[{"role": "user", "content": prompt}],
            response_format=BUILDER_ANALYSIS_SCHEMA,
            temperature=0.7,
            max_tokens=1000,
        )
        content = response.choices[0].message.content
        analysis = BuilderAnalysis.model_validate_json(content)
        return analysis

    except Exception as e:
        print(f"LLM analysis failed: {e}")
        # Fallback: generate a basic analysis without LLM
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
            notable_projects=[r.name for r in user_data.repositories[:3]]
        )
