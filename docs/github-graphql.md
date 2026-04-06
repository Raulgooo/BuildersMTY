# github GraphQL integration

BuildersMTY usa la API GraphQL de GitHub para obtener datos de perfiles de forma eficiente.

---

## por qué GraphQL y no REST

la REST API de GitHub requiere múltiples llamadas secuenciales para obtener perfil, repos, lenguajes, commits y PRs. la API GraphQL permite obtener todo en 1-3 requests.

| dato | REST API | GraphQL |
|------|----------|---------|
| perfil | 1 request | incluido |
| repos (100) | 1 request | incluido |
| lenguajes por repo | 1 request POR repo | incluido |
| commits del año | no disponible directamente | `contributionsCollection` |
| PRs totales | no disponible directamente | `pullRequests.totalCount` |
| repos contribuidos | no disponible | `repositoriesContributedTo` |

---

## queries

### PROFILE_QUERY

obtiene en un solo request:
- perfil (`login`, `avatarUrl`, `email`, `bio`)
- repos propios (paginados, 100 por página, hasta 300)
- contribuciones del año (`totalCommitContributions`, `totalPullRequestContributions`)
- PRs totales
- lenguajes por repo (top 5 por tamaño)

### CONTRIBUTED_REPOS_QUERY

obtiene repos donde el usuario contribuyó pero NO es dueño:
- filtro: `contributionTypes: [COMMIT, PULL_REQUEST, ISSUE]`
- paginado: hasta 100 repos
- post-filtro en código: `owner.login != viewer.login`

esto separa "repos que el usuario construyó" de "repos a los que contribuyó", que es la distinción clave para el scoring y el perfil.

---

## autenticación

usa `bearer` token (requerido para GraphQL):

```
Authorization: bearer {access_token}
```

el token viene del OAuth flow con scope `user:email,repo`, que da acceso a repos públicos y privados.

---

## paginación

ambas queries usan cursor-based pagination:

```graphql
repositories(first: 100, after: $reposCursor) {
  pageInfo { hasNextPage, endCursor }
  nodes { ... }
}
```

el backend hace hasta 3 páginas para repos propios (300 max) y 2 páginas para contribuciones (100 max).

---

## datos extraídos

### por repo propio
- nombre, full_name, descripción
- público/privado
- lenguaje principal + top 5 lenguajes
- estrellas, forks
- fecha de última actualización
- si es fork

### por repo contribuido
- nombre, full_name (incluye owner)
- lenguaje principal
- estrellas, forks
- owner (para filtrar que no sea el usuario)

### estadísticas globales
- `total_commits` -- commits del último año (contributionsCollection)
- `total_prs` -- PRs totales (todos los estados)
- `total_stars` -- suma de estrellas de repos propios
- `total_forks` -- suma de forks de repos propios
