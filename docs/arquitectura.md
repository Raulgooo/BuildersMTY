# arquitectura

BuildersMTY es un sistema de tres componentes que trabajan juntos para analizar, puntuar y exhibir perfiles de desarrolladores.

---

## vista general

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

## componentes

### backend (FastAPI + Discord Bot)

el backend corre en Railway como un proceso dual: el servidor FastAPI y el bot de discord en paralelo usando `multiprocessing`.

**FastAPI** expone:
- `GET /health` -- health check
- `GET /auth/github` -- inicia OAuth con GitHub
- `GET /auth/github/callback` -- recibe el callback, corre scoring + LLM + persist + webhook
- `GET /api/profile/discord/{discord_id}` -- perfil por Discord ID
- `GET /api/profile/github/{username}` -- perfil por GitHub username

**Bot de Discord** (`discord.py`):
- comando `/analyzegit` -- crea un hilo privado con botón de OAuth
- corre en proceso separado, no comparte estado con FastAPI

**servicios internos:**

| servicio | archivo | responsabilidad |
|----------|---------|-----------------|
| GitHub | `services/github.py` | GraphQL API -- repos propios + contribuciones externas + stats |
| Scoring | `services/scoring.py` | algoritmo multi-factor 0-100 con 5 dimensiones |
| LLM | `services/llm.py` | OpenAI SDK → OpenRouter, structured outputs en español |
| Discord | `services/discord.py` | webhook con embed de resultados |
| Supabase | `db/supabase.py` | CRUD de perfiles, service_role key |

### frontend (Next.js)

desplegado en Vercel. mezcla server components (para OG metadata) con client components (para interactividad).

**páginas:**
- `/` -- landing page con secciones de misión, cursos, network, hackathons, open source
- `/profile/[username]` -- perfil compartible con OG tags para link previews
- `/auth/github/callback` -- muestra resultados después del OAuth
- `/notify` -- registro de email/leads en Supabase

**componentes clave:**
- `BuilderCard` -- tarjeta de perfil exportable como PNG (usa `html-to-image`)
- `Header` -- nav responsivo con links a secciones

### base de datos (Supabase)

dos tablas:
- `builder_profiles` -- perfiles de builders con scores, análisis LLM, repos, tags
- `leads` -- emails de usuarios que se registran vía `/notify`

`builder_profiles` tiene columnas indexadas con GIN para `language_tags TEXT[]` y índices en `rank` y `score` para queries eficientes.

---

## flujo de datos completo

1. usuario corre `/analyzegit` en discord
2. bot crea hilo privado + botón de OAuth
3. usuario autoriza GitHub (scope: `user:email,repo`)
4. backend recibe callback con `code` + `state` (contiene `discord_id`)
5. intercambia `code` por `access_token`
6. llama GitHub GraphQL: perfil + repos propios (hasta 300) + repos contribuidos + stats
7. corre scoring algorithm → `ScoringResult` (score, rank, breakdown, highlights)
8. llama LLM vía OpenRouter → `BuilderAnalysis` (summary, strengths, recs, archetype)
9. persiste todo en Supabase (`builder_profiles`)
10. envía webhook a Discord con embed de resultados
11. redirige al frontend con `status=complete`
12. frontend carga perfil desde API y renderiza `BuilderCard`

---

## infraestructura

| componente | plataforma | notas |
|-----------|------------|-------|
| backend + bot | Railway | proceso dual via `start.py` |
| frontend | Vercel | Next.js 15, edge-ready |
| base de datos | Supabase | PostgreSQL managed |
| LLM | OpenRouter | `google/gemini-2.0-flash-001` |
| DNS | Cloudflare | `buildersmty.com.mx` + `api.buildersmty.com.mx` |
