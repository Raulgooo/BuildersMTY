# scoring algorithm

el algoritmo de scoring de BuildersMTY evalúa perfiles de GitHub con un sistema híbrido: 5 dimensiones algorítmicas (90%) + evaluación cualitativa del LLM (10%). usa escala logarítmica y rendimientos decrecientes para que no se pueda gamear fácil.

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

## integración con LLM (+0 a 5 pts bonus)

el LLM no solo genera el análisis — también contribuye al score final. recibe:
- datos crudos del perfil de GitHub
- **README del perfil** (repo `username/username`) si existe
- score algorítmico + desglose por dimensión
- highlights detectados por el scoring

### calificación cualitativa (llm_rating)

el LLM asigna una calificación del 1 al 5 evaluando lo que el algoritmo no puede medir: originalidad, coherencia del stack, calidad del README del perfil, y si el perfil refleja a alguien que genuinamente construye cosas.

| rating | significado | bonus |
|--------|-------------|-------|
| 1 | principiante con actividad mínima | +0 pts |
| 2 | builder temprano, empieza a construir | +1 pt |
| 3 | developer sólido con proyectos reales | +2.5 pts |
| 4 | builder fuerte con impacto demostrado | +4 pts |
| 5 | developer excepcional con portfolio sobresaliente | +5 pts |

### fórmula final

```
score_final = score_algorítmico + bonus_llm
```

el LLM solo puede **sumar**, nunca restar. es un bonus adicional que reconoce lo que el algoritmo no mide.

ejemplo: un developer con 67 pts algorítmico y rating 4 del LLM:
- `67 + 4` = **71 puntos finales** (cerca de LEGEND)

### qué evalúa el LLM que el algoritmo no puede

- **README del perfil**: ¿tiene uno? ¿está bien escrito? ¿muestra quién es?
- **coherencia**: ¿el stack tiene sentido o son repos random?
- **originalidad**: ¿los proyectos resuelven problemas reales?
- **presentación**: ¿las descripciones de repos son claras?
- **narrativa**: ¿el perfil cuenta una historia de builder?

### output del LLM

genera (en español, structured output):
- resumen de 2-3 oraciones
- 3 fortalezas
- 3 recomendaciones
- arquetipo de desarrollador
- 3 repos notables
- calificación 1-5 (contribuye al score)

---

## arquetipos de desarrollador

el LLM asigna un arquetipo basado en tu perfil completo: repos, lenguajes, contribuciones y patrones de actividad. estos son los arquetipos posibles:

| arquetipo | perfil típico |
|-----------|---------------|
| **Systems Hacker** | bajo nivel, kernels, compiladores, eBPF, Rust/C/Go |
| **Full-Stack Builder** | apps completas, integración end-to-end, velocidad de entrega |
| **Frontend Artisan** | UI/UX, animaciones, design systems, accesibilidad |
| **Backend Engineer** | APIs, bases de datos, arquitectura de servicios |
| **Data Engineer** | pipelines, ML, análisis, visualización |
| **DevOps/Infra** | CI/CD, containers, IaC, observabilidad |
| **Security Researcher** | pentesting, auditorías, CVEs, hardening |
| **Mobile Developer** | iOS/Android/React Native/Flutter |
| **Open Source Champion** | contribuciones externas, mantenimiento de libs propias |
| **Founder Builder** | proyectos con tracción real (stars, forks, usuarios) |
| **Builder en Desarrollo** | perfil en construcción, pocos repos o actividad reciente (fallback) |

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

### el README de perfil importa

el LLM lee tu README de perfil (el repo `tu-usuario/tu-usuario`). un buen README puede subir tu rating de 3 a 4 o de 4 a 5. incluye:
- quién eres y qué construyes
- tu stack principal
- proyectos destacados con links
- no necesita ser largo — claridad > extensión

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
