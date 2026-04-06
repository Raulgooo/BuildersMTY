<div align="center">

# BuildersMTY
### una red de builders reales en monterrey

<img src="src/frontend/public/builderslogo.svg" width="120" alt="BuildersMTY logo"/>
<br/>

[![status](https://img.shields.io/badge/status-en_desarrollo-yellow?style=for-the-badge)]()
[![license](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![discord](https://img.shields.io/badge/discord-únete-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/RPqWgsN5H6)

<br/>

**construido con**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)]()
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)]()
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)]()
[![Discord.py](https://img.shields.io/badge/Discord.py-5865F2?style=flat-square&logo=discord&logoColor=white)]()
[![OpenRouter](https://img.shields.io/badge/OpenRouter-LLM-purple?style=flat-square)]()

</div>

---

las comunidades de tech en latam tienen un problema: mucho networking, poca ejecución. todo el mundo se presenta como "desarrollador" pero nadie puede demostrar qué ha construido. no hay forma de filtrar quién realmente sabe y quién solo habla.

**BuildersMTY resuelve eso con código.** un bot de discord analiza tu GitHub completo usando la API GraphQL, corre un algoritmo de scoring multi-factor, y un LLM genera un perfil técnico real. no es un CV, no es una bio. es un análisis objetivo de lo que has construido.

> **si construyes, tu perfil habla por ti. si no, también.**

---

## arquitectura

el sistema tiene tres piezas que trabajan juntas:

**`backend`** -- FastAPI corriendo en Railway. maneja el OAuth de GitHub, corre el scoring algorithm, llama al LLM vía OpenRouter, persiste perfiles en Supabase, y notifica resultados a Discord vía webhook. también tiene el bot de discord que inicia todo el flujo con `/analyzegit`.

**`frontend`** -- Next.js en Vercel. landing page de la comunidad, página de perfil compartible con OG tags, y la callback page que muestra los resultados del análisis. los perfiles se pueden descargar como PNG.

**`scoring engine`** -- algoritmo de 5 dimensiones con escala logarítmica. no es un contador de estrellas. analiza impacto real, diversidad técnica, consistencia, señal open source y "builder DNA".

```
Discord (/analyzegit)
        |
        v
  GitHub OAuth → GraphQL API
        |
        v
  Scoring Engine (5 dimensiones, 0-100)
        |
        v
  LLM Analysis (OpenRouter, structured outputs)
        |
        v
  Supabase (perfil persistido)
        |
        v
  Discord Webhook (resultados) + Frontend (perfil compartible)
```

---

## cómo funciona el scoring

el algoritmo no es un simple "cuenta estrellas y repos". usa análisis multi-factor con escala logarítmica y rendimientos decrecientes para que el sistema no se pueda gamear fácil.

| dimensión | peso | qué mide |
|-----------|------|----------|
| **impacto de repositorios** | 25pts | estrellas (log scale), forks, repos no-triviales |
| **amplitud técnica** | 20pts | diversidad de lenguajes (entropía de Shannon), lenguajes de sistemas vs alto nivel |
| **consistencia y actividad** | 20pts | repos recientes, commits (último año), PRs, longevidad |
| **señal open source** | 20pts | ratio público/privado, repos con descripción, repos populares |
| **builder DNA** | 15pts | proyectos originales vs forks, diversidad de dominio, repos privados |

**rangos:**
- `>= 72` → **BUILDER LEGEND** (top ~10%)
- `>= 40` → **ELITE BUILDER**
- `< 40` → **BUILDER**

el LLM después toma el score, el desglose y los datos crudos de GitHub para generar un resumen, fortalezas, recomendaciones y un arquetipo de desarrollador. todo en español, todo con structured outputs.

---

## el bot

todo empieza en discord. un usuario corre `/analyzegit`, el bot crea un hilo privado con un botón de OAuth. el usuario vincula su GitHub, y en ~10 segundos tiene su perfil completo con score, análisis LLM y un embed bonito en el canal.

el perfil también se guarda en una URL compartible: `buildersmty.com/profile/{username}` con meta tags de Open Graph para que se vea bien cuando lo compartas en discord, twitter, wherever.

---

## setup local

### backend

```bash
cd src/backend
uv sync
```

necesitas estas variables de entorno:

```
DISCORD_BOT_TOKEN=
DISCORD_WEBHOOK_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=http://localhost:8000/auth/github/callback
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
OPENROUTER_API_KEY=
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

```bash
# crear la tabla en supabase (correr el SQL en el dashboard)
cat migrations/001_builder_profiles.sql

# iniciar backend + bot
uv run python src/buildersmty_backend/start.py
```

### frontend

```bash
cd src/frontend
npm install
```

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
BACKEND_URL=http://localhost:8000
```

```bash
npm run dev
```

visita `http://localhost:3000`

---

## estructura del proyecto

```
src/
├── backend/
│   ├── migrations/           # SQL para Supabase
│   └── src/buildersmty_backend/
│       ├── bot.py            # Discord bot (/analyzegit)
│       ├── main.py           # FastAPI + API endpoints
│       ├── start.py          # dual process launcher
│       ├── db/supabase.py    # Supabase CRUD
│       ├── routers/auth.py   # GitHub OAuth flow
│       ├── schemas/user.py   # Pydantic models
│       └── services/
│           ├── github.py     # GitHub GraphQL fetcher
│           ├── scoring.py    # 5-dimension scoring algorithm
│           ├── llm.py        # OpenRouter (OpenAI SDK)
│           └── discord.py    # webhook notifications
└── frontend/
    └── src/
        ├── app/
        │   ├── page.tsx              # landing page
        │   ├── profile/[username]/   # perfil compartible
        │   ├── auth/github/callback/ # OAuth callback
        │   └── notify/               # registro de email
        ├── components/
        │   ├── BuilderCard.tsx       # tarjeta de perfil (exportable a PNG)
        │   ├── Header.tsx
        │   └── Footer.tsx
        └── lib/supabase.ts
```

---

## roadmap

el sistema ya funciona end-to-end pero hay mucho por mejorar.

| status | item |
|--------|------|
| activo | **builders network** -- directorio público de todos los builders analizados |
| WIP | **cursos comunitarios** -- contenido técnico hecho por la comunidad, en español |
| planned | **hackathon platform** -- registro, pagos, brackets y leaderboards |
| planned | **re-análisis periódico** -- actualizar scores automáticamente cada X semanas |
| planned | **badges de hackathon** -- insignias on-chain o en DB por participación/victoria |
| planned | **búsqueda por tags** -- filtrar builders por lenguaje, score, arquetipo |
| planned | **API pública** -- endpoints para que otros proyectos consuman data de builders |

---

## contribuir

el repo es open source. si quieres contribuir:

1. fork → branch → PR
2. los PRs se revisan rápido si tienen contexto
3. si no sabes por dónde empezar, entra al [discord](https://discord.gg/RPqWgsN5H6) y pregunta

no hay burocracia. si tu PR mejora algo y no rompe nada, se mergea.

---

## licencia

MIT. ve [LICENSE](LICENSE) para detalles.

*hecho en monterrey. la mejor manera de aprender es ejecutando.*
