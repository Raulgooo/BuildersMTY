# BuildersMTYY Security Audit

**Date:** 2026-04-08
**Auditor:** Claude Code (Opus 4.6)
**Scope:** Full codebase — frontend (Next.js), backend (FastAPI), auth server (Shark Auth)

---

## Test Suite Status

**Coverage: 0%** — No tests exist. Both `src/backend/tests/` and `src/frontend/tests/` contain only placeholder `roblox.txt` files. No testing frameworks configured, no test scripts defined. Nothing to classify as happy path vs. edge case.

---

## Findings Summary

| # | Severity | Finding | Location |
|---|----------|---------|----------|
| 1 | **CRITICAL** | Insecure OAuth state parameter | `src/backend/.../routers/auth.py:29-33` |
| 2 | **CRITICAL** | Sensitive data exposed in URL parameters | `src/backend/.../routers/auth.py:139-148` |
| 3 | **HIGH** | Missing CSRF protection | `src/backend/.../main.py:24-30` |
| 4 | **HIGH** | Inadequate input validation | `src/backend/.../routers/auth.py:24` |
| 5 | **HIGH** | Overly permissive proxy headers | `main.py:23`, `start.py:42-43` |
| 6 | **HIGH** | Debug logging of sensitive info | `auth.py:98`, `github.py:199,243,356` |
| 7 | **HIGH** | No rate limiting on public endpoints | `main.py:38-53` |
| 8 | **MEDIUM** | Supabase service key with no RLS | `supabase.py:8-9` |
| 9 | **MEDIUM** | Insufficient error handling | `auth.py:84-88` |
| 10 | **MEDIUM** | LLM prompt injection risk | `llm.py:88-126` |
| 11 | **LOW** | Missing security headers | All backend routes |
| 12 | **LOW** | Overly long session lifetime | `sharkauth.yaml:25` |

---

## Detailed Findings

### 1. CRITICAL: Insecure OAuth State Parameter

**Location:** `src/backend/src/buildersmty_backend/routers/auth.py` (lines 29-33, 59-63)

The OAuth state parameter uses base64 encoding instead of cryptographic signing:

```python
state_data = {
    "discord_id": discord_id,
    "nonce": secrets.token_urlsafe(16)
}
state = base64.urlsafe_b64encode(json.dumps(state_data).encode()).decode()
```

**Risk:** State can be decoded by any attacker to extract `discord_id`. An attacker can craft valid state values containing arbitrary Discord IDs, enabling CSRF attacks.

**Recommendation:**
- Use HMAC-signed tokens instead of plain base64
- Store state server-side with expiration
- Validate signature on callback

---

### 2. CRITICAL: Sensitive Data Exposed in URL Parameters

**Location:** `src/backend/src/buildersmty_backend/routers/auth.py` (lines 139-148)

User data is passed as query parameters in the redirect URL:

```python
final_redirect_url = (
    f"{FRONTEND_URL}/auth/github/callback?"
    f"discord_id={discord_id}&"
    f"github_user={user_data.username}&"
    f"status=complete&"
    f"score={scoring.score}&"
    f"rank={scoring.rank}"
)
```

**Risk:** Discord ID, score, and rank leak to browser history, server logs, and referrer headers.

**Recommendation:** Use server-side session storage. Pass a session token in the URL, retrieve data server-side.

---

### 3. HIGH: Missing CSRF Protection

**Location:** `src/backend/src/buildersmty_backend/main.py` (lines 24-30)

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)
```

All POST endpoints lack CSRF token validation. The GitHub callback performs state-modifying operations (Supabase upserts, Discord role assignments) without CSRF checks.

**Recommendation:** Implement SameSite=Strict cookies and CSRF token validation on all state-modifying operations.

---

### 4. HIGH: Inadequate Input Validation

**Location:** `src/backend/src/buildersmty_backend/routers/auth.py` (lines 24, 38-43)

Discord ID and GitHub username from query parameters are used without validation:

```python
async def github_login(discord_id: str = Query(...)):
    # No validation on discord_id format
```

**Risk:** Invalid Discord IDs stored in database, no length limits enforced.

**Recommendation:**
- Validate Discord ID: numeric only, 18-20 characters
- Validate GitHub username: alphanumeric + dash only
- Add Pydantic validators to schemas

---

### 5. HIGH: Overly Permissive Proxy Headers

**Location:** `src/backend/src/buildersmty_backend/main.py` (line 23) and `start.py` (lines 42-43)

```python
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")
uvicorn.run(app, host="0.0.0.0", port=port, proxy_headers=True, forwarded_allow_ips="*")
```

**Risk:** Any client can spoof IP addresses via X-Forwarded-For headers, breaking rate limiting, logging, and access control.

**Recommendation:** Restrict `trusted_hosts` and `forwarded_allow_ips` to specific proxy IPs (Railway load balancer).

---

### 6. HIGH: Debug Logging of Sensitive Information

**Location:** `src/backend/src/buildersmty_backend/routers/auth.py` (line 98), `services/github.py` (lines 199, 243, 356)

```python
print(f"[Scoring] Algorithmic: {algorithmic_scoring.score}, LLM rating: {analysis.llm_rating}/5, Final: {scoring.score}")
```

**Risk:** Scoring data and user information logged to stdout, visible in container logs.

**Recommendation:** Remove debug print statements or use proper logging with appropriate log levels disabled in production.

---

### 7. HIGH: No Rate Limiting on Public Endpoints

**Location:** `src/backend/src/buildersmty_backend/main.py` (lines 38-53)

```python
@app.get("/api/profile/discord/{discord_id}")
async def get_profile_by_discord(discord_id: str):
    # No rate limiting

@app.get("/api/profile/github/{username}")
async def get_profile_by_github(username: str):
    # No rate limiting
```

**Risk:** Profile enumeration via brute force, resource exhaustion, DoS on expensive GitHub API calls.

**Recommendation:** Implement rate limiting with `slowapi` or `fastapi-limiter`. Suggested: 100 req/hour for public endpoints, 10 req/hour for callback per Discord ID.

---

### 8. MEDIUM: Supabase Service Key with No RLS

**Location:** `src/backend/src/buildersmty_backend/db/supabase.py` (lines 8-9)

```python
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")
```

**Risk:** Service key grants full admin database access. If backend is compromised, attacker gets unrestricted read/write to all tables.

**Recommendation:** Enable Row Level Security (RLS) policies. Use scoped tokens instead of the service key where possible.

---

### 9. MEDIUM: Insufficient Error Handling

**Location:** `src/backend/src/buildersmty_backend/routers/auth.py` (lines 84-88)

```python
try:
    user_data = await github.fetch_user_data(access_token)
except Exception as e:
    print(f"Error fetching user data: {e}")
    return RedirectResponse(...)
```

**Risk:** Generic exception handling masks security-relevant errors. Error messages could leak implementation details.

**Recommendation:** Catch specific exception types. Log with context but return generic messages to users.

---

### 10. MEDIUM: LLM Prompt Injection Risk

**Location:** `src/backend/src/buildersmty_backend/services/llm.py` (lines 88-126)

User-controlled data from GitHub (username, bio, README content) is directly interpolated into LLM prompts:

```python
return f"""## Input: Perfil GitHub
**Usuario:** {user_data.username}
**Bio:** {user_data.bio or '-'}
...
{readme_section}
"""
```

**Risk:** GitHub bio and README content are fully user-controlled. Prompt injection could cause the LLM to ignore instructions or produce manipulated scores.

**Recommendation:** Escape or quote user inputs. Truncate to reasonable lengths. Use structured inputs instead of string interpolation.

---

### 11. LOW: Missing Security Headers

**Location:** All backend responses

No X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, or Content-Security-Policy headers configured.

**Recommendation:** Add security headers middleware:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=31536000`
- `Content-Security-Policy: strict policy`

---

### 12. LOW: Overly Long Session Lifetime

**Location:** `src/auth_server/sharkauth.yaml` (line 25)

```yaml
auth:
  session_lifetime: "30d"
```

**Risk:** 30-day sessions provide a long window for stolen session exploitation.

**Recommendation:** Reduce to 7-14 days. Implement refresh token rotation and "logout all devices" functionality.

---

## Quick Wins (Priority Order)

1. **Remove debug `print()` statements** — stops data leaking to logs
2. **Add input validation** on `discord_id` (numeric, 18-20 chars) and GitHub username (alphanumeric + dash)
3. **Fix OAuth state** — replace `base64` with HMAC-signed tokens or server-side session storage
4. **Add security headers middleware** — standard hardening
5. **Move sensitive data from URL params to server-side session** — stops leaking to browser history

---

## CORS Fix Applied During This Session

Added `https://www.buildersmty.com.mx` to `src/auth_server/sharkauth.yaml` cors_origins — the `www` variant was missing, causing CORS preflight failures for users visiting via `www`.
