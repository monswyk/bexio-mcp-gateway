---
phase: 10-position-management
plan: 01
subsystem: api
tags: [zod, positions, bexio-client, sales-documents, crud]

# Dependency graph
requires:
  - phase: 09-sales-completion
    provides: "Sales document tools (quotes, orders, invoices) that positions attach to"
provides:
  - "Zod schemas for position CRUD across 7 position types and 3 document types"
  - "DOCUMENT_TYPE_MAP and POSITION_TYPE_MAP constants for handler URL construction"
  - "5 generic BexioClient position methods parameterized by documentType and positionType"
affects: [10-02, 10-03]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Generic parameterized client methods to avoid N*M code duplication", "Human-readable enum to API-internal name mapping constants"]

key-files:
  created: [src/types/schemas/positions.ts]
  modified: [src/types/schemas/index.ts, src/bexio-client.ts]

key-decisions:
  - "Generic position methods parameterized by documentType/positionType avoid 105 nearly-identical methods"
  - "Human-readable enums (quote/order/invoice, default/item/text/etc.) mapped to API names in schema constants"
  - "Edit uses POST (not PUT) per Bexio API convention for positions"

patterns-established:
  - "DOCUMENT_TYPE_MAP: human-readable document names -> Bexio API names (quote->kb_offer, etc.)"
  - "POSITION_TYPE_MAP: human-readable position names -> Bexio API names (default->kb_position_custom, etc.)"
  - "Generic BexioClient methods with URL construction from type parameters"

requirements-completed: [POS-01, POS-02, POS-03, POS-04, POS-05, POS-06, POS-07]

# Metrics
duration: 1min
completed: 2026-03-03
---

# Phase 10 Plan 01: Position Schemas & Client Methods Summary

**Zod schemas for 5 position CRUD operations with generic BexioClient methods parameterized by document type and position type**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-03T20:26:39Z
- **Completed:** 2026-03-03T20:28:05Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Created positions.ts with 5 Zod schemas (List, Get, Create, Edit, Delete) covering all position operations
- Added DOCUMENT_TYPE_MAP and POSITION_TYPE_MAP constants for handler URL construction
- Added 5 generic position CRUD methods to BexioClient that construct nested URLs from type parameters

## Task Commits

Each task was committed atomically:

1. **Task 1: Create position schemas and types** - `61a6bd9` (feat)
2. **Task 2: Add generic position methods to BexioClient** - `930326f` (feat)

## Files Created/Modified
- `src/types/schemas/positions.ts` - 5 Zod schemas, 5 TypeScript types, 2 mapping constants for positions domain
- `src/types/schemas/index.ts` - Added barrel export for positions module
- `src/bexio-client.ts` - Added POSITIONS section with 5 generic CRUD methods

## Decisions Made
- Generic position methods parameterized by documentType/positionType avoid 105 nearly-identical client methods (5 operations x 7 position types x 3 document types)
- Human-readable enums mapped to API-internal names in schema constants (handler responsibility to translate)
- Edit uses POST (not PUT) per Bexio API convention for positions

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Position schemas and client methods ready for plans 10-02 and 10-03 to build tool definitions and handlers
- All 7 position types supported through parameterized approach
- TypeScript compiles clean with zero errors

---
*Phase: 10-position-management*
*Completed: 2026-03-03*
