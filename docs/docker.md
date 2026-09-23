# Running the gateway with Docker

The gateway is a single container that lets several MCP clients work with Bexio at the same time. Claude Desktop is one such client.

```
MCP client (client-1) ─┐
MCP client (client-2) ─┼─ HTTPS + access key ─▶ /mcp ── OAuth ──▶ Bexio API
MCP client (client-n) ─┘                        Bexio user "bexio-user"
```

- A **Bexio user** is one Bexio login. An admin connects it once in the browser. After that the gateway refreshes the token in the background; the refresh token stays valid as long as it is used at least once a year, and the gateway uses it daily.
- A **client** is one MCP client. It gets its own access key and is mapped to a Bexio user. Several clients can share one Bexio user. If you later work with more Bexio logins, add one per login and map the clients accordingly.

## 1. Register an app at Bexio

1. Sign in at [developer.bexio.com](https://developer.bexio.com) with a Bexio user that has admin rights and create a new app.
2. Add the redirect URL `https://<your-domain>/oauth/callback`.
3. Note the **client ID** and **client secret**.

The gateway requests these scopes by default (everything the tools need; payroll is read-only):

```
openid profile email company_profile offline_access
accounting article_edit bank_account_show bank_payment_edit contact_edit file
kb_invoice_edit kb_offer_edit kb_order_edit kb_delivery_edit kb_article_order_edit
kb_bill_show kb_expense_show monitoring_edit note_edit project_edit stock_edit task_edit
payroll_employee_show payroll_absence_show payroll_paystub_show
```

To grant less, set `BEXIO_SCOPES` in `.env` (it must contain `offline_access`). Bexio additionally limits every call to what the connected Bexio user may do.

## 2. Prepare the server

Requirements: a host that can run the container, a DNS name, and an HTTPS proxy you already operate. Forward `https://<your-domain>` to the container port. Do not buffer responses: `/mcp` uses server-sent events. The process listens on port **8000** unless you set `PORT`.

```bash
git clone https://github.com/monswyk/bexio-mcp-gateway.git
cd bexio-mcp-gateway

cp gateway.env.example .env
# edit .env: PUBLIC_BASE_URL and BEXIO_CLIENT_ID

./scripts/init-secrets.sh
```

`init-secrets.sh` asks for the Bexio client secret and creates:

| File | Content |
|------|---------|
| `secrets/bexio_client_secret` | Client secret of the Bexio app |
| `secrets/token_encryption_key` | AES-256 key that encrypts the stored Bexio tokens. **Back this up.** |
| `secrets/gateway_admin_key` | Password for the admin page (printed once) |
| `config/clients.json` | Client list, initially empty |

Start the stack:

```bash
docker compose up -d --build
docker compose logs -f bexio-mcp
```

`docker-compose.yml` publishes port 8000 and does not terminate TLS. Point your proxy at that port.

To run without Compose:

```bash
docker build -t bexio-mcp-gateway .
docker run -d --name bexio-mcp-gateway \
  -p 8000:8000 \
  -v bexio-data:/data \
  -e PUBLIC_BASE_URL=https://<your-domain> \
  -e BEXIO_CLIENT_ID=<client id> \
  -e BEXIO_CLIENT_SECRET=<client secret> \
  -e TOKEN_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  -e GATEWAY_ADMIN_KEY=<at least 16 characters> \
  -e MCP_CLIENTS_FILE=/data/clients.json \
  bexio-mcp-gateway
```

## 3. Connect Bexio

1. Open `https://<your-domain>/admin`. Enter any user name and the admin key from `secrets/gateway_admin_key` as the password.
2. Keep the suggested Bexio user `bexio-user` (or enter another one) and click **Connect with Bexio**.
3. Sign in at Bexio **as the user whose rights the AI should use**, then approve the consent screen.
4. The gateway confirms the connection. On `/admin` it is listed as `active` together with the Bexio company and user.

`https://<your-domain>/health` now reports `{"status":"ok"}`.

## 4. Add clients

For each MCP client:

```bash
./scripts/client-add.sh client-1 bexio-user
```

The script prints the access key (`bmg_...`) **once**. Only its SHA-256 hash is stored in `config/clients.json`. The running gateway picks up the change within seconds; no restart is needed.

Hand the key to the user over a secure channel. Running the command again for the same name replaces the key.

To revoke a client, remove its entry from `config/clients.json` or set `"disabled": true`. Open sessions of that client are closed shortly afterwards.

```json
{
  "client-1": { "keyHash": "sha256:…", "connection": "bexio-user" },
  "client-2": { "keyHash": "sha256:…", "connection": "bexio-user", "disabled": true }
}
```

## 5. Configure the MCP client

Point the client at `https://<your-domain>/mcp`. The endpoint speaks MCP Streamable HTTP. Send this header on every request:

```
Authorization: Bearer bmg_your-access-key
```

Where the client stores the URL and the header is up to that client. Claude Desktop, for example, starts a local process and does not call the URL itself:

```json
{
  "mcpServers": {
    "bexio": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://<your-domain>/mcp", "--header", "Authorization:${BEXIO_AUTH}"],
      "env": {
        "BEXIO_AUTH": "Bearer bmg_your-access-key"
      }
    }
  }
}
```

## Operations

**Audit log.** Every tool call is logged with client, connection, tool, duration and outcome (no arguments, no results):

```bash
docker compose logs bexio-mcp | grep AUDIT
```

**Reconnect.** If the admin page shows `reconnect required` (for example after the consent was revoked in Bexio, or the gateway was offline for more than a year), click **Reconnect** next to the connection. Clients keep their keys.

**Backup.** Back up the `bexio-data` volume (`connections.enc`), `secrets/token_encryption_key` and `config/clients.json`. Without the encryption key the stored login cannot be decrypted, and you have to connect again.

**Update.**

```bash
git pull
docker compose up -d --build
```

**Fewer tools.** `BEXIO_ENABLED_CATEGORIES` in `.env` limits which tool categories are registered. Example: `contacts,invoices,quotes,orders,projects,timetracking`.

## Configuration reference

The container reads these environment variables. For the secret values, `NAME_FILE` pointing to a file works as well; `docker-compose.yml` uses this for the Docker secrets.

| Variable | Required | Default | Meaning |
|----------|----------|---------|---------|
| `PUBLIC_BASE_URL` | yes | | External URL, for example `https://gateway.example.com` |
| `BEXIO_CLIENT_ID` | yes | | Client ID of the Bexio app |
| `BEXIO_CLIENT_SECRET` | yes | | Client secret of the Bexio app |
| `TOKEN_ENCRYPTION_KEY` | yes | | 64 hex characters (`openssl rand -hex 32`) |
| `GATEWAY_ADMIN_KEY` | yes | | Admin page password, at least 16 characters |
| `BEXIO_SCOPES` | no | see above | Space-separated scopes, must contain `offline_access` |
| `BEXIO_REDIRECT_URI` | no | `$PUBLIC_BASE_URL/oauth/callback` | Must match the Bexio app |
| `BEXIO_ENABLED_CATEGORIES` | no | all | Comma-separated tool categories |
| `DATA_DIR` | no | `/data` | Location of `connections.enc` |
| `MCP_CLIENTS_FILE` | no | `/config/clients.json` | Client list |
| `MCP_SESSION_TTL_MINUTES` | no | `60` | Idle MCP sessions are closed after this time |
| `PORT` / `HOST` | no | `8000` / `0.0.0.0` | Listen address |
