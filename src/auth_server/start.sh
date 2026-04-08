#!/bin/sh
# Start shark-auth on internal port 8081
./shark-auth --config sharkauth.yaml &

# Start Caddy on port 8080 (public-facing)
caddy run --config /app/Caddyfile --adapter caddyfile
