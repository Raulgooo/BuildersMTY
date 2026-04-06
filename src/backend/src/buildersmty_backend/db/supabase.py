import os
from supabase import create_client, Client
from supabase.lib.client_options import SyncClientOptions
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY", "")

_client: Client | None = None


def get_client() -> Client:
    global _client
    if _client is None:
        if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
            raise RuntimeError("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set")
        _client = create_client(
            SUPABASE_URL,
            SUPABASE_SERVICE_KEY,
            options=SyncClientOptions(
                auto_refresh_token=False,
                persist_session=False,
            ),
        )
    return _client


def upsert_user_profile(profile: dict) -> dict:
    client = get_client()
    profile["updated_at"] = "now()"
    result = (
        client.table("builder_profiles")
        .upsert(profile, on_conflict="discord_id")
        .execute()
    )
    return result.data[0] if result.data else {}


def get_user_profile(discord_id: str) -> dict | None:
    client = get_client()
    result = (
        client.table("builder_profiles")
        .select("*")
        .eq("discord_id", discord_id)
        .maybe_single()
        .execute()
    )
    return result.data


def get_user_by_github(github_username: str) -> dict | None:
    client = get_client()
    result = (
        client.table("builder_profiles")
        .select("*")
        .eq("github_username", github_username)
        .maybe_single()
        .execute()
    )
    return result.data
