# Requirements: Bexio MCP v2

**Defined:** 2026-02-01
**Core Value:** Enable anyone to connect Claude Desktop to their Bexio accounting system with zero friction

## v2.0 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Upgrade SDK from 0.5.0 to 1.25.2 with all breaking changes addressed
- [x] **FOUND-02**: Refactor server.ts (2,418 lines) into domain-organized modules (<200 lines each)
- [x] **FOUND-03**: Create MCPB bundle with manifest.json for one-click Claude Desktop install
- [x] **FOUND-04**: Publish npm package with bin field for `npx @bexio/mcp-server` usage
- [x] **FOUND-05**: Maintain dual transport (stdio for Claude Desktop, HTTP for n8n)
- [x] **FOUND-06**: Pin Zod to v3.22.x to avoid SDK compatibility issues
- [x] **FOUND-07**: Configure stderr-only logging to prevent stdout contamination

### Existing Tools (Backward Compatibility)

- [x] **EXIST-01**: Preserve all 83 v1 tool names exactly (no renaming)
- [x] **EXIST-02**: Contacts: list, get, search, advanced_search, find_by_number, find_by_name, update (7 tools)
- [x] **EXIST-03**: Invoices: list, list_all, get, search, search_by_customer, create, issue, cancel, mark_sent, send, copy, statuses, list_all_statuses, get_open, get_overdue (15 tools)
- [x] **EXIST-04**: Quotes: list, get, create, search, search_by_customer, issue, accept, decline, send, create_order_from, create_invoice_from (11 tools)
- [x] **EXIST-05**: Orders: list, get, create, search, search_by_customer, create_delivery_from, create_invoice_from (7 tools)
- [x] **EXIST-06**: Payments: list, get, create, delete (4 tools)
- [x] **EXIST-07**: Reminders: list, get, create, delete, mark_sent, send, search, get_sent_this_week (8 tools)
- [x] **EXIST-08**: Deliveries: list, get, issue, search (4 tools)
- [x] **EXIST-09**: Items & Taxes: list, get, create items; list, get taxes (5 tools)
- [x] **EXIST-10**: Reports: revenue, customer_revenue, invoice_status, overdue_invoices, monthly_revenue, top_customers, tasks_due_this_week (7 tools)
- [x] **EXIST-11**: Users: current_user, fictional_users CRUD (6 tools)
- [x] **EXIST-12**: Comments & Relations: list, get, create comments; relations CRUD + search (9 tools)

### Reference Data (New)

- [x] **REFDATA-01**: Contact groups: list, get, create, delete
- [x] **REFDATA-02**: Contact sectors: list, get, create
- [x] **REFDATA-03**: Salutations: list, get, create, delete
- [x] **REFDATA-04**: Titles: list, get, create, delete
- [x] **REFDATA-05**: Countries: list, get, create, delete
- [x] **REFDATA-06**: Languages: list, get, create
- [x] **REFDATA-07**: Units: list, get, create, delete
- [x] **REFDATA-08**: Payment types: list, get, create
- [x] **REFDATA-09**: Company profile: get, update
- [x] **REFDATA-10**: Permissions: list

### Banking (New)

- [x] **BANK-01**: Bank accounts: list, get (read-only)
- [x] **BANK-02**: Currencies: list, get, create, delete, update
- [x] **BANK-03**: IBAN payments: create, get, update (Swiss ISO 20022)
- [x] **BANK-04**: QR payments: create, get, update (Swiss QR-invoice standard)

### Projects & Time Tracking (New)

- [x] **PROJ-01**: Projects: list, get, create, update, delete
- [x] **PROJ-02**: Project types: list, get
- [x] **PROJ-03**: Project statuses: list, get
- [x] **PROJ-04**: Milestones: list, get, create, delete
- [x] **PROJ-05**: Work packages: list, get, create, update, delete
- [x] **PROJ-06**: Timesheets: list, get, create, delete
- [x] **PROJ-07**: Timesheet statuses: list
- [x] **PROJ-08**: Business activities: list, get, create
- [x] **PROJ-09**: Communication types: list, get

### Accounting (New)

- [x] **ACCT-01**: Accounts (chart of accounts): list, get, create
- [x] **ACCT-02**: Account groups: list
- [x] **ACCT-03**: Calendar years: list, get
- [x] **ACCT-04**: Business years: list
- [x] **ACCT-05**: Manual entries: list, get, create, update, delete
- [x] **ACCT-06**: VAT periods: list
- [x] **ACCT-07**: Accounting journal: get

### Purchase Management (New)

- [x] **PURCH-01**: Bills (creditor invoices): list, get, create, update, delete
- [x] **PURCH-02**: Bill actions: issue, mark paid
- [x] **PURCH-03**: Expenses: list, get, create, update, delete
- [x] **PURCH-04**: Purchase orders: list, get, create, update, delete
- [x] **PURCH-05**: Outgoing payments: list, get, create, update, delete

### Files & Documents (New)

- [x] **FILES-01**: Files: list, get, create, delete, update
- [x] **FILES-02**: File download: get file content/PDF
- [x] **FILES-03**: Additional addresses: list, get, create, delete

### Payroll (Conditional - requires Bexio payroll module)

- [x] **PAY-01**: Employees: list, get, create, update
- [x] **PAY-02**: Absences: list, get, create, update, delete
- [x] **PAY-03**: Payroll documents: list

### MCP Apps / UI Elements (New)

- [x] **UI-01**: Implement MCP Apps capability declaration
- [x] **UI-02**: Invoice preview UI resource (HTML template)
- [x] **UI-03**: Contact card UI resource (HTML template)
- [x] **UI-04**: Dashboard summary UI resource (optional)

### Distribution

- [ ] **DIST-01**: Submit MCPB bundle to MCP Registry
- [ ] **DIST-02**: Publish npm package to public registry
- [ ] **DIST-03**: Create GitHub release with source and bundle
- [ ] **DIST-04**: Write installation documentation for all channels

## v2.2.0 Requirements

Requirements for complete Bexio API coverage. Each maps to roadmap phases.

### Contacts

- [x] **CONT-01**: User can create a new contact (person or company)
- [x] **CONT-02**: User can delete a contact
- [x] **CONT-03**: User can bulk create multiple contacts in one call
- [x] **CONT-04**: User can restore a deleted contact

### Sales Documents

- [x] **SALES-01**: User can edit/update an existing quote
- [x] **SALES-02**: User can delete a quote
- [x] **SALES-03**: User can revert a quote from issued to draft
- [x] **SALES-04**: User can reissue a quote
- [x] **SALES-05**: User can mark a quote as sent
- [x] **SALES-06**: User can get a quote as PDF
- [x] **SALES-07**: User can copy a quote
- [x] **SALES-08**: User can edit/update an existing order
- [x] **SALES-09**: User can delete an order
- [x] **SALES-10**: User can get an order as PDF
- [x] **SALES-11**: User can get/edit/delete order repetitions
- [x] **SALES-12**: User can edit/update an existing invoice
- [x] **SALES-13**: User can delete an invoice
- [x] **SALES-14**: User can get an invoice as PDF
- [x] **SALES-15**: User can revert an invoice from issued to draft

### Reminders

- [x] **REMIND-01**: User can mark a reminder as unsent
- [x] **REMIND-02**: User can get a reminder as PDF

### Items

- [x] **ITEMS-01**: User can edit/update an existing item
- [x] **ITEMS-02**: User can delete an item
- [x] **ITEMS-03**: User can search items

### Notes (New Domain)

- [x] **NOTES-01**: User can list, get, create, update, delete, and search notes

### Tasks (New Domain)

- [x] **TASKS-01**: User can list, get, create, update, delete, and search tasks
- [x] **TASKS-02**: User can view task priorities and statuses

### Positions (New Domain -- 7 Types)

- [x] **POS-01**: User can manage default positions (list, get, create, edit, delete)
- [x] **POS-02**: User can manage item positions (list, get, create, edit, delete)
- [x] **POS-03**: User can manage text positions (list, get, create, edit, delete)
- [x] **POS-04**: User can manage subtotal positions (list, get, create, edit, delete)
- [x] **POS-05**: User can manage discount positions (list, get, create, edit, delete)
- [x] **POS-06**: User can manage pagebreak positions (list, get, create, edit, delete)
- [x] **POS-07**: User can manage sub positions (list, get, create, edit, delete)

### Reference Data Gaps

- [x] **REFDATA-11**: User can edit and search contact groups
- [x] **REFDATA-12**: User can search contact sectors
- [x] **REFDATA-13**: User can edit and search salutations
- [x] **REFDATA-14**: User can edit and search titles
- [x] **REFDATA-15**: User can edit and search additional addresses

### Users

- [x] **USERS-01**: User can list and get real users (not just fictional)

### Stock (New Domain)

- [x] **STOCK-01**: User can list and search stock locations
- [x] **STOCK-02**: User can list and search stock areas

### Document Settings (New Domain)

- [x] **DOCS-01**: User can list document settings
- [x] **DOCS-02**: User can list document templates

## v3.x Requirements (Deferred)

Acknowledged but deferred to future releases.

### Extended Features

- **EXT-01**: Tool consolidation (reduce tools to polymorphic tools)
- **EXT-05**: Advanced MCP Apps (data grids, interactive forms)
- **EXT-06**: Caching layer for frequently accessed reference data

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Mobile app | Web/desktop only |
| OAuth flow | API token is sufficient and simpler |
| Real-time webhooks | MCP is request/response, not push |
| Multi-company support | Single Bexio account per installation |
| Legacy timesheet API | Deprecated per Bexio docs |
| Custom caching | Stateless design for simplicity |
| SDK v2.0 (when released) | Build on stable v1.25.x, upgrade later |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 5 | Complete |
| FOUND-04 | Phase 5 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Complete |
| EXIST-01 | Phase 1 | Complete |
| EXIST-02 | Phase 1 | Complete |
| EXIST-03 | Phase 1 | Complete |
| EXIST-04 | Phase 1 | Complete |
| EXIST-05 | Phase 1 | Complete |
| EXIST-06 | Phase 1 | Complete |
| EXIST-07 | Phase 1 | Complete |
| EXIST-08 | Phase 1 | Complete |
| EXIST-09 | Phase 1 | Complete |
| EXIST-10 | Phase 1 | Complete |
| EXIST-11 | Phase 1 | Complete |
| EXIST-12 | Phase 1 | Complete |
| REFDATA-01 | Phase 2 | Complete |
| REFDATA-02 | Phase 2 | Complete |
| REFDATA-03 | Phase 2 | Complete |
| REFDATA-04 | Phase 2 | Complete |
| REFDATA-05 | Phase 2 | Complete |
| REFDATA-06 | Phase 2 | Complete |
| REFDATA-07 | Phase 2 | Complete |
| REFDATA-08 | Phase 2 | Complete |
| REFDATA-09 | Phase 2 | Complete |
| REFDATA-10 | Phase 2 | Complete |
| BANK-01 | Phase 2 | Complete |
| BANK-02 | Phase 2 | Complete |
| BANK-03 | Phase 2 | Complete |
| BANK-04 | Phase 2 | Complete |
| PROJ-01 | Phase 3 | Complete |
| PROJ-02 | Phase 3 | Complete |
| PROJ-03 | Phase 3 | Complete |
| PROJ-04 | Phase 3 | Complete |
| PROJ-05 | Phase 3 | Complete |
| PROJ-06 | Phase 3 | Complete |
| PROJ-07 | Phase 3 | Complete |
| PROJ-08 | Phase 3 | Complete |
| PROJ-09 | Phase 3 | Complete |
| ACCT-01 | Phase 3 | Complete |
| ACCT-02 | Phase 3 | Complete |
| ACCT-03 | Phase 3 | Complete |
| ACCT-04 | Phase 3 | Complete |
| ACCT-05 | Phase 3 | Complete |
| ACCT-06 | Phase 3 | Complete |
| ACCT-07 | Phase 3 | Complete |
| PURCH-01 | Phase 4 | Complete |
| PURCH-02 | Phase 4 | Complete |
| PURCH-03 | Phase 4 | Complete |
| PURCH-04 | Phase 4 | Complete |
| PURCH-05 | Phase 4 | Complete |
| FILES-01 | Phase 4 | Complete |
| FILES-02 | Phase 4 | Complete |
| FILES-03 | Phase 4 | Complete |
| PAY-01 | Phase 4 | Complete |
| PAY-02 | Phase 4 | Complete |
| PAY-03 | Phase 4 | Complete |
| UI-01 | Phase 5 | Complete |
| UI-02 | Phase 5 | Complete |
| UI-03 | Phase 5 | Complete |
| UI-04 | Phase 5 | Complete |
| DIST-01 | Phase 6 | Pending |
| DIST-02 | Phase 6 | Pending |
| DIST-03 | Phase 6 | Pending |
| DIST-04 | Phase 6 | Pending |
| CONT-01 | Phase 8 | Complete |
| CONT-02 | Phase 8 | Complete |
| CONT-03 | Phase 8 | Complete |
| CONT-04 | Phase 8 | Complete |
| NOTES-01 | Phase 8 | Complete |
| TASKS-01 | Phase 8 | Complete |
| TASKS-02 | Phase 8 | Complete |
| USERS-01 | Phase 8 | Complete |
| STOCK-01 | Phase 8 | Complete |
| STOCK-02 | Phase 8 | Complete |
| DOCS-01 | Phase 8 | Complete |
| DOCS-02 | Phase 8 | Complete |
| REFDATA-11 | Phase 8 | Complete |
| REFDATA-12 | Phase 8 | Complete |
| REFDATA-13 | Phase 8 | Complete |
| REFDATA-14 | Phase 8 | Complete |
| REFDATA-15 | Phase 8 | Complete |
| SALES-01 | Phase 9 | Complete |
| SALES-02 | Phase 9 | Complete |
| SALES-03 | Phase 9 | Complete |
| SALES-04 | Phase 9 | Complete |
| SALES-05 | Phase 9 | Complete |
| SALES-06 | Phase 9 | Complete |
| SALES-07 | Phase 9 | Complete |
| SALES-08 | Phase 9 | Complete |
| SALES-09 | Phase 9 | Complete |
| SALES-10 | Phase 9 | Complete |
| SALES-11 | Phase 9 | Complete |
| SALES-12 | Phase 9 | Complete |
| SALES-13 | Phase 9 | Complete |
| SALES-14 | Phase 9 | Complete |
| SALES-15 | Phase 9 | Complete |
| REMIND-01 | Phase 9 | Complete |
| REMIND-02 | Phase 9 | Complete |
| ITEMS-01 | Phase 9 | Complete |
| ITEMS-02 | Phase 9 | Complete |
| ITEMS-03 | Phase 9 | Complete |
| POS-01 | Phase 10 | Complete |
| POS-02 | Phase 10 | Complete |
| POS-03 | Phase 10 | Complete |
| POS-04 | Phase 10 | Complete |
| POS-05 | Phase 10 | Complete |
| POS-06 | Phase 10 | Complete |
| POS-07 | Phase 10 | Complete |

**v2.0 Coverage:**
- v2.0 requirements: 67 total
- Mapped to phases: 67
- Unmapped: 0

**v2.2 Coverage:**
- v2.2 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

**v2.2 Phase Distribution:**
- Phase 8 (Contacts, New Domains & Reference Gaps): 17 requirements
- Phase 9 (Sales Document Completion): 20 requirements
- Phase 10 (Position Management): 7 requirements

---
*Requirements defined: 2026-02-01*
*v2.2 requirements added: 2026-03-03*
*v2.2 traceability mapped: 2026-03-03*
*Last updated: 2026-03-03 after v2.2 roadmap creation*
