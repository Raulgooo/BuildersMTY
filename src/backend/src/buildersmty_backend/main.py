from fastapi import FastAPI
from buildersmty_backend.routers import auth

app = FastAPI(title="Builders MTY Backend")

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "builders-mty-backend"}

app.include_router(auth.router, prefix="/auth", tags=["auth"])
