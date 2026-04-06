# discord bot

el bot de BuildersMTY es el punto de entrada al sistema de análisis. corre como un proceso separado del backend usando `discord.py`.

---

## comando

### /analyzegit

**descripción:** "Vincula tu GitHub y analiza tu perfil de Builder"

**flujo:**
1. usuario ejecuta `/analyzegit` en cualquier canal
2. bot defiere la respuesta (ephemeral)
3. crea un hilo privado: `Análisis GitHub: {display_name}`
4. añade al usuario al hilo
5. envía un embed con:
   - descripción de qué se va a analizar
   - botón "Vincular GitHub" que apunta a OAuth
6. responde al usuario con link al hilo

**auto-eliminación del hilo:** el hilo se elimina automáticamente después de 2 minutos para mantener los canales limpios. si el bot se reinicia antes de que se cumpla el tiempo, el hilo se archiva después de 1 hora (fallback de Discord).

**después del OAuth:**

el backend procesa todo (scoring + LLM + persist) y envía un webhook al canal con los resultados completos en un embed.

**asignación de roles:** el backend asigna automáticamente un rol de Discord según tu rango. si ya tenías un rango anterior, se remueve antes de asignar el nuevo.

| rango | rol de Discord | color |
|-------|---------------|-------|
| BUILDER | `DISCORD_ROLE_BUILDER` | gris oscuro |
| ELITE BUILDER | `DISCORD_ROLE_ELITE_BUILDER` | coral |
| BUILDER LEGEND | `DISCORD_ROLE_BUILDER_LEGEND` | dorado |

---

## embed de resultados

el webhook envía un embed con:

| campo | contenido |
|-------|-----------|
| **author** | @username + avatar + link a GitHub |
| **title** | rango + score (ej: "ELITE BUILDER — 67.5/100") |
| **description** | resumen LLM + línea de stats (commits, PRs, stars) |
| **arquetipo** | ej: "Full-Stack Builder" |
| **lenguajes** | tags inline |
| **top repos** | repos propios ordenados por estrellas (top 5) |
| **contribuciones** | repos externos donde contribuyó (top 5) |
| **fortalezas** | 3 puntos del LLM |
| **recomendaciones** | 3 puntos del LLM |

colores del embed por rango:
- **BUILDER LEGEND** → dorado (`0xFFD700`)
- **ELITE BUILDER** → coral (`0xFF5540`)
- **BUILDER** → gris oscuro (`0x603E39`)

---

## arquitectura del proceso

```
start.py
├── Process 1: Discord Bot (background)
│   └── BuildersBot(discord.Client)
│       └── CommandTree → /analyzegit
└── Process 2: FastAPI Server (main)
    └── uvicorn → app
```

el bot y el servidor corren en procesos separados via `multiprocessing`. no comparten estado. la comunicación entre ellos es a través de:
- bot → genera OAuth URL que apunta al backend
- backend → envía resultados via Discord webhook (no necesita comunicarse con el bot directamente)

---

## permisos del bot

intents necesarios:
- `default` intents
- `members` intent (para operaciones con miembros)

permisos:
- crear hilos
- enviar mensajes en hilos
- enviar embeds
- leer mensajes

---

## variables de entorno

| variable | uso |
|----------|-----|
| `DISCORD_BOT_TOKEN` | autenticación del bot |
| `DISCORD_WEBHOOK_URL` | webhook para enviar resultados |
| `DISCORD_GUILD_ID` | ID del servidor para asignar roles |
| `DISCORD_ROLE_BUILDER` | ID del rol para rango BUILDER |
| `DISCORD_ROLE_ELITE_BUILDER` | ID del rol para rango ELITE BUILDER |
| `DISCORD_ROLE_BUILDER_LEGEND` | ID del rol para rango BUILDER LEGEND |
| `BACKEND_URL` | base URL para generar links de OAuth |

---

## qué analiza el bot

cuando vinculas tu GitHub, el sistema analiza:

1. **todos tus repos** — públicos, privados, personales y de organizaciones
2. **contribuciones del año actual** — commits, PRs, issues (mismo conteo que tu perfil de GitHub)
3. **repos donde contribuiste** — proyectos de terceros donde hiciste commits o PRs
4. **lenguajes** — stack principal y secundarios
5. **impacto** — estrellas, forks, tracción real

con eso calcula tu [score](/docs/scoring.md), asigna un rango, y el LLM genera un análisis personalizado con tu arquetipo de desarrollador.

### arquetipos

el bot te asigna un arquetipo basado en tu perfil. ve la [lista completa de arquetipos](/docs/scoring.md#arquetipos-de-desarrollador) en la documentación de scoring.

### ¿cómo subo de rango?

ve la [guía de progresión](/docs/scoring.md#cómo-progresar) para acciones concretas que te ayudan a subir de BUILDER a ELITE y de ELITE a LEGEND.
