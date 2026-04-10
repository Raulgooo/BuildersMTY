# BuildersMTY — Course Platform Spec

**Version:** 0.1 — Design Phase  
**Stack:** Next.js + Supabase + SharkAuth + Docker VPS (Hetzner)

---

## 1. Concepto

Plataforma de cursos tipo **BuildYourOwnX / CodeCrafters**: el estudiante construye sistemas reales desde cero, en el navegador, con un workspace interactivo guiado. No hay video lectures. El aprendizaje es por implementación y feedback inmediato de tests.

---

## 2. Catálogo de Cursos

### Lanzamiento

| Slug               | Título                             | Lenguaje  | Dificultad |
| ------------------ | ---------------------------------- | --------- | ---------- |
| `memory-allocator` | Crea tu Propio Alocador de Memoria | C         | Avanzado   |
| `http-server`      | Crea tu Servidor HTTP              | Go        | Intermedio |
| `claude-code`      | Crea tu Propio Claude Code         | Python/Go | Avanzado   |

### Roadmap post-launch

| Slug            | Título                           | Lenguaje   | Dificultad |
| --------------- | -------------------------------- | ---------- | ---------- |
| `redis`         | Crea tu Propio Redis             | Go / C     | Intermedio |
| `shell`         | Crea tu Propio Shell UNIX        | C          | Intermedio |
| `git`           | Crea tu Propio Git               | Go         | Avanzado   |
| `sqlite`        | Crea tu Propio SQLite            | C          | Avanzado   |
| `docker`        | Crea tu Propio Container Runtime | Go         | Avanzado   |
| `compiler`      | Crea tu Propio Compilador        | C / Rust   | Avanzado   |
| `regex-engine`  | Crea tu Propio Motor de Regex    | Go / C     | Intermedio |
| `load-balancer` | Crea tu Propio Load Balancer     | Go         | Intermedio |
| `auth-server`   | Crea tu Propio Auth Server       | Go         | Avanzado   |
| `ebpf-tracer`   | Crea tu Propio eBPF Tracer       | C / Go     | Avanzado   |
| `react`         | Crea tu Propio React             | JavaScript | Intermedio |
| `tcp-stack`     | Crea tu Propio TCP Stack         | C          | Avanzado   |

---

## 3. Modelo de Datos

```
Course
  id, slug, title, description, language, difficulty_options[]
  status: draft | published | coming_soon

Module  (pertenece a Course)
  id, course_id, order, title, description
  integration_test_id   ← test que corre al completar todos sus submodules

Submodule  (pertenece a Module)
  id, module_id, order, title, spec_description
  stubs: { filename: string, content: string }[]
  makefile: string

Test
  id, submodule_id | module_id
  stdin, expected_stdout, timeout_ms
  type: "submodule" | "module_integration"

Resource
  id, submodule_id, title, content (MDX)
  type: "doc" | "signature" | "spec" | "hint"
  visible_to: ("junior" | "mid" | "senior")[]

Enrollment
  user_id, course_id
  difficulty: junior | mid | senior
  github_repo_name: string
  status: active | completed | transferred
  enrolled_at, completed_at

SubmoduleState
  user_id, submodule_id
  status: locked | in_progress | passed
  attempts: int
  passed_at

Certificate
  user_id, course_id, difficulty, issued_at
  stats: { loc, files, modules_completed, duration_days }
  github_repo_url
```

> **Nota:** El contenido MDX de los recursos vive en el repo del proyecto (versionado), no en Supabase. Supabase solo persiste progreso y estado.

---

## 4. Sistema de Dificultad

Los **stubs y los tests son idénticos para todos los niveles**. Lo que cambia es qué recursos se muestran en el workspace.

| Tipo de recurso                           | Junior | Mid | Senior |
| ----------------------------------------- | :----: | :-: | :----: |
| Docs de sintaxis básica                   |   ✅   | ❌  |   ❌   |
| Explicación conceptual (qué es X)         |   ✅   | ✅  |   ❌   |
| Hints de implementación paso a paso       |   ✅   | ❌  |   ❌   |
| Descripción técnica / inner workings      |   ✅   | ✅  |   ✅   |
| Firma y definición de funciones           |   ✅   | ✅  |   ✅   |
| Docs crudos directo de la spec/RFC/source |   ✅   | ✅  |   ✅   |

La dificultad se fija al hacer enroll y no cambia. El filtro es puramente en frontend: `resources.filter(r => r.visible_to.includes(enrollment.difficulty))`.

---

## 5. Arquitectura del Workspace

```
WorkspaceShell
├── ProgressSidebar
│     ├── ModuleTree
│     │     └── SubmoduleItem  [locked | in_progress | passed]
│     └── DifficultyBadge  (read-only post-enrollment)
│
├── EditorPane
│     ├── FileTabBar  (un tab por archivo del stub)
│     ├── MonacoEditor
│     └── ActionBar
│           └── RunTests button
│
├── ResourcePanel  (drawer lateral o split derecho)
│     ├── ResourceList  (filtrado por difficulty automáticamente)
│     │     └── ResourceCard  [doc | signature | spec | hint]
│     └── SearchBar
│
└── TestResultsPane  (abajo del editor, colapsable)
      ├── TestRow  [pending | pass | fail + diff de output]
      ├── ModuleIntegrationTestBanner
      │     └── aparece solo cuando todos los submodules del módulo pasan
      └── PassGate → unlock next submodule | trigger CompletionFlow
```

**Editor:** Monaco (`@monaco-editor/react`). Un editor, múltiples archivos via tabs. Estado del editor vive en el browser (in-memory). Supabase guarda snapshot de los archivos cada ~30s y en cada test run.

---

## 6. Pipeline de Ejecución de Tests

### Infraestructura

VPS Hetzner CX21 (2 vCPU, 4GB RAM, ~€4.5/mes) corriendo Docker con un **pool de containers pre-warmed** por lenguaje/curso.

```
Container pool:
  - buildersmty/runner-c:latest       → memory-allocator, tcp-stack
  - buildersmty/runner-go:latest      → http-server, redis, load-balancer
  - buildersmty/runner-python:latest  → claude-code
```

Cada imagen tiene todas las deps del curso ya instaladas. Cold start prácticamente cero.

### Flow de un test run

```
User clicks "Run Tests"
  → browser envía POST /api/run
      { files[], makefile, language, submodule_id }
  → backend toma container libre del pool
  → monta archivos como volumen tmpfs (in-memory)
  → ejecuta: make test-{submodule_id}
  → captura stdout/stderr via streaming
  → WebSocket stream de vuelta al browser (output en tiempo real)
  → desmonta tmpfs, devuelve container al pool
  → parse resultado: passed | failed + diff
  → si passed: actualiza SubmoduleState en Supabase + git commit
```

### Seguridad de los containers de ejecución

```
--network=none          (sin acceso a internet)
--cpus=0.5
--memory=256m
--pids-limit=64
timeout hard kill: 10s
```

**Excepción:** El curso `claude-code` necesita egress a `api.anthropic.com`. Ese pool usa una docker network separada con reglas iptables de whitelist.

### Capacidad estimada (CX21)

- ~27 runs concurrentes antes de saturar RAM
- Suficiente para el launch. Upgrade a CX31 (€9/mes) cuando escale.

---

## 7. Git / GitHub Integration

### GitHub App en la BuildersMTY org

Una **GitHub App** (no OAuth App) instalada en la org con permisos de admin sobre repos. Esta es la identidad de la plataforma para crear y transferir repos.

El usuario autentica con su propio GitHub OAuth via SharkAuth con scope `repo`. Dos tokens operando en paralelo: el de la plataforma (org admin) y el del usuario (committer).

### Flow completo

```
Usuario inicia curso
  → POST /api/courses/{course_id}/enroll
  → backend crea repo en BuildersMTY org via GitHub App:
      nombre: "bldrs-{courseSlug}-{uuidv4}"
      private: true
      commit inicial: "chore: init workspace" con todos los stubs
  → enrollment.github_repo_name guardado en Supabase
  → workspace carga stubs desde el repo (solo al inicio)

Submodule pasa tests
  → git commit al repo:
      "feat({module}/{submodule}): {submodule_title}"
      committer: { name: user.name, email: user.github_email }
  → commit va en nombre real del usuario

Curso completado
  → Certificate generado (ver sección 9)
  → Usuario hace click en "Claim your repo"
  → POST /repos/buildersmty/{repo}/transfers → { new_owner: github_username }
  → GitHub envía email al usuario para aceptar la transferencia
  → Repo pasa a ser del usuario con commit history completa
```

> El transfer requiere aceptación manual del usuario via email de GitHub. Es un límite de la API de GitHub, no de la plataforma. Se puede comunicar como "tu repo llegará en un momento".

---

## 8. Scope de GitHub OAuth (SharkAuth)

Al enrollar en el primer curso se hace un "permission upgrade" lazy:

- Signup normal: scope `read:user user:email`
- Al iniciar curso: re-authorize con scope adicional `repo`
- SharkAuth guarda el access token con los nuevos scopes

No se pide `repo` en el signup para no asustar al usuario con permisos innecesarios en ese momento.

---

## 9. Certificate

Generado server-side al completar el curso. Stats calculados en el momento:

```
loc               → sum de líneas de todos los archivos del workspace final
files             → count de archivos únicos modificados
modules_completed → count de modules con SubmoduleState.status = "passed"
duration_days     → days(enrolled_at → completed_at)
difficulty        → del enrollment
```

Renderizado como SVG interpolado con los datos → PDF via Puppeteer (o SVG estático directamente). Guardado en Supabase Storage. URL del cert guardada en `Certificate.github_repo_url` para mostrarse en el perfil.

Texto del cert:

```
I completed the: {course_title} challenge
Difficulty: {Senior | Mid | Junior}
Wrote {X} lines across {Y} files
Completed in {Z} days
— BuildersMTY
```

---

## 10. Decisiones Técnicas

| Decisión            | Elección                                        | Razón                                             |
| ------------------- | ----------------------------------------------- | ------------------------------------------------- |
| Editor              | Monaco (`@monaco-editor/react`)                 | LSP-ready, React wrapper maduro                   |
| Ejecución de tests  | Docker pool en VPS propio                       | Sin cold start, costo mínimo (~€4.5/mes)          |
| State del workspace | Browser in-memory + Supabase snapshot           | Sin llamadas constantes a GitHub API              |
| Git history         | Repo por enrollment en GitHub (BuildersMTY org) | Commit history real, transfer limpia al completar |
| Contenido de cursos | MDX en el repo (versionado con el código)       | Fácil de editar, no mezcla con datos de usuario   |
| Auth                | SharkAuth (ya implementado)                     | GitHub OAuth con upgrade lazy de scope `repo`     |
| Cert                | SVG/PDF server-side                             | Autónomo, sin deps externas                       |

---

## 11. Notas de Implementación (2-day sprint)

**Día 1**

- Schema de Supabase (Enrollment, SubmoduleState, Certificate)
- GitHub App setup en la org + endpoint de creación de repo
- WorkspaceShell básico: Monaco + FileTabBar + ResourcePanel (sin filtro de difficulty aún)
- Docker image `runner-c` con deps del memory-allocator
- Endpoint `/api/run` + pool de containers básico (sin WebSocket aún, polling es aceptable para v1)

**Día 2**

- Git commit on test pass
- ProgressSidebar + unlock flow
- Difficulty filter en ResourcePanel
- CompletionFlow: stats + cert básico + trigger de transfer
- Deploy en Hetzner

**Deferido post-launch**

- WebSocket streaming de output (polling es v1)
- Admin dashboard para subir cursos (v1: cursos hardcodeados en MDX)
- GitHub repo transfer automático (v1: botón manual "Claim your repo")
- Cursos `redis`, `git`, `sqlite`, etc.
