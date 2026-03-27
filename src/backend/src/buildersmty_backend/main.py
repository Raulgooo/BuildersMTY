from fastapi import FastAPI
from uvicorn.middleware.proxy_headers import ProxyHeadersMiddleware
from buildersmty_backend.routers import auth

app = FastAPI(title="Builders MTY Backend")
app.add_middleware(ProxyHeadersMiddleware, trusted_hosts="*")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "builders-mty-backend"}

app.include_router(auth.router, prefix="/auth", tags=["auth"])

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
