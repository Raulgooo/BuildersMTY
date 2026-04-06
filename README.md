<div align="center">

# BuildersMTY
### comunidad de builders en monterrey

<img src="src/frontend/public/builderslogo.svg" width="120" alt="BuildersMTY logo"/>
<br/>

[![web](https://img.shields.io/badge/web-buildersmty.com.mx-ff5540?style=for-the-badge)](https://buildersmty.com.mx)
[![discord](https://img.shields.io/badge/discord-únete-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/RPqWgsN5H6)
[![license](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

BuildersMTY es una comunidad de estudiantes y desarrolladores en Monterrey, iniciada por alumnos de la UANL FCFM. la premisa es simple: si construyes software, demuéstralo. si no, aprende haciéndolo.

organizamos hackathons, cursos técnicos en español, y mantenemos proyectos open source que la comunidad usa. todo el sistema detrás de la comunidad (este repo) es open source: el bot de discord que analiza tu GitHub, el scoring algorithm, la landing page, los perfiles compartibles.

> **la mejor manera de aprender es ejecutando.**

---

## docs

toda la documentación técnica vive en `/docs`. si quieres entender cómo funciona el sistema por dentro, empieza aquí:

| documento | qué cubre |
|-----------|-----------|
| **[arquitectura](docs/arquitectura.md)** | vista general del sistema, componentes, flujo de datos completo, infraestructura |
| **[scoring algorithm](docs/scoring.md)** | las 5 dimensiones del scoring, cálculos, rangos, detección de proyectos originales |
| **[github GraphQL](docs/github-graphql.md)** | por qué GraphQL, queries, paginación, datos extraídos, repos propios vs contribuidos |
| **[discord bot](docs/discord-bot.md)** | comando /analyzegit, embed de resultados, arquitectura del proceso dual |
| **[setup local](docs/setup.md)** | cómo correr todo en tu máquina, variables de entorno completas (backend + frontend) |

---

## el stack

| componente | tecnología | dónde |
|-----------|------------|-------|
| frontend | Next.js 15, React 19, Tailwind CSS | Vercel |
| backend | FastAPI, Python 3.12 | Railway |
| bot | discord.py | Railway (mismo servicio) |
| base de datos | Supabase (PostgreSQL) | Supabase Cloud |
| LLM | OpenRouter (Gemini Flash) | API |
| GitHub data | GitHub GraphQL API | API |

---

## qué hacemos

**hackathons** -- eventos cortos e intensos. 12 horas, equipos de 1-3 personas, premio en efectivo. formatos: coding, game jams, pentesting.

**cursos** -- contenido técnico en español, creado por la comunidad. git, backend, frontend, go, linux, seguridad. todo gratuito.

**open source** -- este repo es uno de varios proyectos activos. si quieres ganar experiencia real, colabora. revisa la [landing](https://buildersmty.com.mx) para ver los proyectos.

**builder profiles** -- un bot de discord analiza tu GitHub con IA y te asigna un score. tu perfil es compartible y descargable como imagen. [más detalles en docs](docs/arquitectura.md).

---

## contribuir

1. fork → branch → PR
2. los PRs se revisan rápido si tienen contexto
3. si no sabes por dónde empezar, entra al [discord](https://discord.gg/RPqWgsN5H6)

para setup local, ve [docs/setup.md](docs/setup.md).

---

## contacto

**Raúl R. González** -- fundador
- email: [raul@buildersmty.com.mx](mailto:raul@buildersmty.com.mx)
- github: [@raulgooo](https://github.com/raulgooo)
- discord: [BuildersMTY](https://discord.gg/RPqWgsN5H6)

---

## licencia

MIT. ve [LICENSE](LICENSE) para detalles.

*hecho en monterrey.*
