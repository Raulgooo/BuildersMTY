# setup local

guía para correr BuildersMTY en tu máquina.

---

## requisitos

- Python 3.12+
- Node.js 18+
- [uv](https://docs.astral.sh/uv/) (package manager de Python)
- cuenta de Supabase
- GitHub OAuth App configurada
- API key de OpenRouter
- Bot de Discord con token

---

## backend

```bash
cd src/backend
uv sync
```

crea un archivo `.env` (o configura las variables en tu entorno):

```
DISCORD_BOT_TOKEN=tu_token
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
GITHUB_CLIENT_ID=tu_client_id
GITHUB_CLIENT_SECRET=tu_client_secret
GITHUB_REDIRECT_URI=http://localhost:8000/auth/github/callback
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_KEY=tu_service_role_key
OPENROUTER_API_KEY=sk-or-v1-...
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

crea las tablas en Supabase (correr en el SQL Editor):

```bash
# tabla principal
cat migrations/001_builder_profiles.sql

# columna de repos contribuidos
cat migrations/002_add_contributed_repos.sql
```

inicia el backend + bot:

```bash
uv run python src/buildersmty_backend/start.py
```

esto lanza dos procesos: FastAPI en el puerto 8000 y el bot de discord en background.

---

## frontend

```bash
cd src/frontend
npm install
```

variables de entorno (`.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
BACKEND_URL=http://localhost:8000
```

```bash
npm run dev
```

visita `http://localhost:3000`

---

## variables de entorno completas

### backend (Railway)

| variable | descripción |
|----------|-------------|
| `DISCORD_BOT_TOKEN` | token del bot de discord |
| `DISCORD_WEBHOOK_URL` | webhook para notificaciones |
| `GITHUB_CLIENT_ID` | OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | OAuth App secret |
| `GITHUB_REDIRECT_URI` | callback URL del OAuth |
| `SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_SERVICE_KEY` | service_role key (secreto) |
| `OPENROUTER_API_KEY` | API key de OpenRouter |
| `FRONTEND_URL` | URL del frontend (para CORS y redirects) |
| `BACKEND_URL` | URL del backend (para OAuth links) |
| `PORT` | puerto del servidor (Railway lo asigna automáticamente) |

### frontend (Vercel)

| variable | descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de Supabase (pública) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon key de Supabase (pública) |
| `NEXT_PUBLIC_BACKEND_URL` | URL del backend (se bake en build time) |
| `BACKEND_URL` | URL del backend (para server-side metadata) |

> **nota:** las variables `NEXT_PUBLIC_*` se inyectan al JS en build time. después de cambiarlas en Vercel hay que hacer redeploy.
