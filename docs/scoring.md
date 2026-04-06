# scoring algorithm

el algoritmo de scoring de BuildersMTY evalúa perfiles de GitHub con un sistema multi-factor de 5 dimensiones. usa escala logarítmica y rendimientos decrecientes para que no se pueda gamear fácil.

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
