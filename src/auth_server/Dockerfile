FROM debian:bookworm-slim

# Install ca-certificates and caddy
RUN apt-get update && \
    apt-get install -y ca-certificates caddy && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the compiled executable, config, and Caddyfile
COPY shark-auth .
COPY sharkauth.yaml .
COPY Caddyfile .
COPY start.sh .

# Ensure executables have correct permissions
RUN chmod +x shark-auth start.sh

# Expose the application port (Caddy listens on 8080)
EXPOSE 8080

CMD ["./start.sh"]
