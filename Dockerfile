# syntax=docker/dockerfile:1
#
# bexio-mcp-gateway: Bexio MCP server for several clients (gateway mode).
#
#   docker compose up -d --build        (see docs/docker.md)
#
# Based on the Dockerfile of asig/bexio-mcp-server (MIT).

# ---- build stage ----
FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY src/package.json src/package-lock.json ./
RUN npm ci

COPY src/ ./
RUN npm run build && npm prune --omit=dev

# ---- runtime stage ----
FROM node:20-bookworm-slim AS runtime

LABEL org.opencontainers.image.title="bexio-mcp-gateway"
LABEL org.opencontainers.image.description="Bexio MCP gateway: Streamable HTTP, Bexio OAuth with background refresh, per-client access keys"
LABEL org.opencontainers.image.source="https://github.com/monswyk/bexio-mcp-gateway"
LABEL org.opencontainers.image.licenses="MIT"

WORKDIR /app

ENV NODE_ENV=production \
    MCP_MODE=gateway \
    HOST=0.0.0.0 \
    PORT=8000 \
    DATA_DIR=/data \
    MCP_CLIENTS_FILE=/config/clients.json

RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --gid 1001 mcp \
    && useradd --uid 1001 --gid mcp --shell /bin/false --create-home mcp \
    && mkdir -p /data /config \
    && printf '%s\n' '{}' > /config/clients.json \
    && chown -R mcp:mcp /data /config

COPY --from=build --chown=mcp:mcp /app/dist ./dist
COPY --from=build --chown=mcp:mcp /app/node_modules ./node_modules
COPY --from=build --chown=mcp:mcp /app/package.json ./

USER mcp

VOLUME ["/data"]
EXPOSE 8000

ENTRYPOINT ["node", "dist/index.js"]
