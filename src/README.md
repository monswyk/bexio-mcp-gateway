# Bexio MCP Server

MCP server that connects an MCP client to [Bexio](https://www.bexio.com/), the Swiss accounting platform. 314 tools for invoices, contacts, projects, time tracking, banking, account balances, and more.

> **Early Release** — Functional and tested, but under active development. [Report issues here.](https://github.com/promptpartner/bexio-mcp-server/issues)

## Install

### Option 1: npm (stdio)

Any MCP client that starts a local process can run:

```bash
npx @promptpartner/bexio-mcp-server
```

Pass the Bexio API token in the environment:

```json
{
  "mcpServers": {
    "bexio": {
      "command": "npx",
      "args": ["@promptpartner/bexio-mcp-server"],
      "env": {
        "BEXIO_API_TOKEN": "your-token-here"
      }
    }
  }
}
```

A `.mcpb` bundle is also attached to [Releases](https://github.com/PromptPartner/bexio-mcp-server/releases) for clients that install MCP bundles.

### Option 2: Build from Source

```bash
git clone https://github.com/promptpartner/bexio-mcp-server
cd bexio-mcp-server/src
npm install && npm run build
BEXIO_API_TOKEN=your-token node dist/index.js
```

### HTTP

Start in HTTP mode for any remote MCP client:

```bash
BEXIO_API_TOKEN=your-token npx @promptpartner/bexio-mcp-server --mode http --port 8000
```

## Compatibility

| Client | Transport | Status |
|--------|-----------|--------|
| Any MCP client | stdio or HTTP | Supported |

## Getting Your Bexio API Token

1. Go to [developer.bexio.com](https://developer.bexio.com/)
2. Log in with your regular Bexio account
3. Navigate to **Personal Access Tokens**
4. Click **Create New Token**
5. Copy the token and use it in your configuration

## Features

This MCP server provides **310 tools** across all Bexio domains:

### Contacts & CRM
- Create, update, search contacts
- Contact groups, sectors, salutations, titles
- Contact relations management

### Invoices & Sales
- Full invoice lifecycle (create, issue, send, cancel)
- Quotes with accept/decline workflows
- Orders with delivery management
- Incoming payments tracking
- Interactive invoice preview

### Banking & Payments
- Swiss QR-bill payment support (QR-IBAN)
- Standard IBAN payments (ISO 20022)
- Currency management (CHF, EUR)
- Bank account management

### Projects & Time Tracking
- Project management with types and statuses
- Milestones and work packages
- Timesheet entries with duration tracking
- Business activities and communication types

### Accounting
- Chart of accounts
- Manual journal entries
- Business years and VAT periods
- Account groups

### Purchase & Expenses
- Bills (creditor invoices)
- Expenses and purchase orders
- Outgoing payments

### Files & Documents
- Document upload/download
- File management

### Payroll (requires Bexio Payroll module)
- Employee management
- Absence tracking
- Payroll documents

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BEXIO_API_TOKEN` | Yes | - | Your Bexio API token |
| `BEXIO_BASE_URL` | No | `https://api.bexio.com/2.0` | API endpoint URL |

## Command Line Options

```bash
npx @promptpartner/bexio-mcp-server [options]

Options:
  --mode <stdio|http>  Transport mode (default: stdio)
  --host <address>     HTTP host (default: 0.0.0.0)
  --port <number>      HTTP port (default: 8000)
```

## Troubleshooting

### "Invalid API token" error
- Verify your token at [developer.bexio.com](https://developer.bexio.com/) > Personal Access Tokens
- Ensure the token has not expired
- Check that the token has the required permissions

### "Connection refused" error
- Check your internet connection
- Verify BEXIO_BASE_URL is correct (default: https://api.bexio.com/2.0)

### Payroll tools return "module not available"
- Payroll tools require the Bexio Payroll module subscription
- Contact Bexio support to enable the module

### The MCP client doesn't see the server
- Restart the client after configuration changes
- Verify the client is starting this process, or can reach the HTTP port
- Check the client log for error messages

## Privacy Policy

This MCP server acts as a pass-through to the Bexio API and does not store any data. For full details, see our [Privacy Policy](PRIVACY.md).

Your data is processed according to [Bexio's Privacy Policy](https://www.bexio.com/en-CH/privacy-policy).

## Support

- **Issues & Bug Reports:** [GitHub Issues](https://github.com/promptpartner/bexio-mcp-server/issues)

## Acknowledgments

This project builds on [promptpartner/bexio-mcp-server](https://github.com/promptpartner/bexio-mcp-server) and the earlier server published at [bryner.tech](https://bryner.tech/).

## Disclaimer

This is an independent, community-driven project and is **not affiliated with, endorsed by, or officially connected to Bexio AG** in any way. "Bexio" is a trademark of Bexio AG. This project simply provides an integration layer to the publicly available Bexio API.

Use of this software is at your own risk. The authors are not responsible for any issues arising from its use with your Bexio account.

## License

MIT - See [LICENSE](LICENSE) for details.

## Links

- [Bexio API Documentation](https://docs.bexio.com/)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [PromptPartner.ai](https://promptpartner.ai)
