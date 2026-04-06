# scoring algorithm

el algoritmo de scoring de BuildersMTY evalúa perfiles de GitHub con un sistema multi-factor de 5 dimensiones. usa escala logarítmica y rendimientos decrecientes para que no se pueda gamear fácil.

> **¿cómo subo de rango?** ve directo a [guía de progresión](#cómo-progresar) al final del documento.

---

## dimensiones

### A. impacto de repositorios (25pts)

| métrica | cálculo | máximo |
|---------|---------|--------|
| estrellas | `min(10, log2(total_stars + 1) * 1.5)` | 10 |
| forks recibidos | `min(5, total_forks * 0.5)` | 5 |
| repos no-triviales (>5★ o >2 forks) | `count * 2` | 10 |

### B. amplitud técnica (20pts)

| métrica | cálculo | máximo |
|---------|---------|--------|
| cantidad de lenguajes | `min(8, unique_langs * 2)` | 8 |
| balance de lenguajes | entropía de Shannon × 3 | 6 |
| lenguaje de sistemas (C/Rust/Go/Zig) | bonus fijo | 3 |
| bajo nivel + alto nivel | bonus fijo | 3 |

### C. consistencia y actividad (20pts)

| métrica | cálculo | máximo |
|---------|---------|--------|
| repos recientes (últimos 90 días) | `count * 1.5` | 5 |
| total repos (log scale) | `log2(total + 1)` | 3 |
| commits (último año, log scale) | `log2(commits + 1) * 0.7` | 5 |
| pull requests (log scale) | `log2(prs + 1) * 0.8` | 3 |
| builder de largo plazo (>1 año + reciente) | bonus fijo | 4 |

### D. señal open source (20pts)

| métrica | cálculo | máximo |
|---------|---------|--------|
| ratio repos públicos | `(public / total) * 8` | 8 |
| repos con descripción | `(described / total) * 4` | 4 |
| diversidad de lenguajes en repos | `unique_langs * 0.5` | 4 |
| repos populares (>20★) | bonus fijo | 4 |

### E. builder DNA (15pts)

| métrica | cálculo | máximo |
|---------|---------|--------|
| proyectos originales (no forks/tutorials) | `count * 2.5` | 8 |
| diversidad de dominio | `domain_count * 1.0` | 4 |
| tiene repos privados | bonus fijo | 3 |

---

## rangos

| rango | score | descripción |
|-------|-------|-------------|
| **BUILDER LEGEND** | >= 72 | top ~10%, impacto real demostrado |
| **ELITE BUILDER** | >= 40 | developer sólido con trayectoria |
| **BUILDER** | < 40 | empezando a construir |

---

## detección de proyectos originales

el algoritmo identifica repos que probablemente son proyectos originales vs forks/tutoriales usando heurísticas:

- nombre NO contiene: fork, tutorial, course, exercise, homework, copy, clone, example, demo, test, dotfiles
- tiene descripción de más de 10 caracteres
- tiene al menos 1 estrella o fork

---

## integración con LLM

después del scoring, el LLM (vía OpenRouter) recibe:
- datos crudos del perfil de GitHub
- score + desglose por dimensión
- highlights detectados por el scoring

genera (en español, structured output):
- resumen de 2-3 oraciones
- 3 fortalezas
- 3 recomendaciones
- arquetipo de desarrollador
- 3 repos notables

---

## arquetipos de desarrollador

el LLM asigna un arquetipo basado en tu perfil completo: repos, lenguajes, contribuciones y patrones de actividad. estos son los arquetipos posibles:

| arquetipo | perfil típico |
|-----------|---------------|
| **Full-Stack Builder** | trabaja en frontend y backend, tiene repos con múltiples tecnologías (React + Node, Django + Vue, etc.) |
| **Systems Hacker** | domina lenguajes de bajo nivel (C, C++, Rust, Go, Zig), trabaja en herramientas, CLIs o infraestructura |
| **Frontend Artisan** | enfocado en UI/UX, repos con JavaScript/TypeScript, frameworks como React, Vue, Svelte |
| **Data Engineer** | trabaja con Python, R, SQL, pipelines de datos, notebooks, repos de análisis o ML |
| **DevOps Specialist** | repos de infraestructura, Dockerfiles, CI/CD configs, Terraform, Kubernetes |
| **Security Researcher** | herramientas de seguridad, análisis de vulnerabilidades, CTF writeups |
| **Mobile Developer** | repos con Swift, Kotlin, Dart/Flutter, React Native |
| **Open Source Contributor** | contribuciones activas a proyectos externos, PRs a repos de terceros |
| **Builder en Desarrollo** | perfil en construcción, pocos repos o actividad reciente (arquetipo por defecto) |

el arquetipo no es fijo — se recalcula cada vez que vinculas tu GitHub. a medida que tu perfil evoluciona, tu arquetipo cambia.

---

## cómo progresar

### de BUILDER (< 40) a ELITE BUILDER (>= 40)

el salto más común. aquí tienes las acciones con más impacto por dimensión:

| dimensión | acción concreta | puntos potenciales |
|-----------|-----------------|--------------------|
| **impacto** | crea 2-3 repos con README y descripción que resuelvan un problema real | +5 a +10 |
| **amplitud técnica** | aprende un segundo o tercer lenguaje y crea al menos un repo con él | +4 a +8 |
| **consistencia** | haz commits regulares (no tiene que ser diario, pero sí varias veces al mes) | +3 a +5 |
| **open source** | haz tus repos públicos con buenas descripciones | +4 a +8 |
| **builder DNA** | crea proyectos propios (no forks de tutoriales) | +5 a +8 |

**tip:** no necesitas repos con miles de estrellas. un par de proyectos originales, bien documentados y con actividad consistente te lleva a ELITE.

### de ELITE BUILDER (>= 40) a BUILDER LEGEND (>= 72)

este salto requiere impacto real y diversidad:

| dimensión | acción concreta | puntos potenciales |
|-----------|-----------------|--------------------|
| **impacto** | logra que al menos 2-3 repos tengan >5 estrellas orgánicas | +4 a +10 |
| **amplitud técnica** | aprende un lenguaje de sistemas (C, Rust, Go) además de tu stack principal | +3 a +6 |
| **consistencia** | mantén actividad >500 commits/año y crea PRs activamente | +3 a +5 |
| **open source** | ten al menos un repo con >20 estrellas | +4 |
| **builder DNA** | ten 5+ proyectos originales en dominios diferentes | +5 a +8 |

**tip:** la clave de LEGEND es la combinación. no basta ser bueno en una dimensión — necesitas ser consistente en todas. un builder con 1000 commits pero solo en un lenguaje y sin estrellas no llega a LEGEND.

### acciones que NO suman (o suman poco)

- hacer fork de repos populares sin modificarlos
- repos sin descripción ni README
- repos con nombres genéricos (test, example, homework)
- actividad concentrada en un solo día/semana
- tener muchos repos vacíos o sin commits

### la escala logarítmica importa

el scoring usa `log2` para la mayoría de métricas. esto significa:
- tus primeros 10 commits valen mucho más que los commits 990-1000
- tu primera estrella vale más que la estrella 100
- diversificar > acumular en una sola métrica

por eso es más efectivo tener 5 repos con 3 estrellas cada uno que 1 repo con 15 estrellas.
