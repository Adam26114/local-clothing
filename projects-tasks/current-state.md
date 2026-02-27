# Current State

## Snapshot
- Date: February 27, 2026
- Time: 10:16 PM (local)
- Project: Khit Myanmar E-commerce
- Current implementation stage: Stage 1 (Convex Data Migration) completed

## Completed
- Added dual-mode data source architecture (`mock|convex`) with server-side selection and fallback behavior.
- Added repository boundary for:
  - products
  - inventory
  - settings
  - categories
- Implemented adapters:
  - mock adapter
  - convex adapter
- Added Stage 1 Convex functions:
  - `categories.list`
  - `products.byId`
  - `products.duplicate`
  - `products.toggleBulkStatus`
  - `inventory.listFlattened`
  - `inventory.updateStockWithAudit`
  - `inventory.listAuditLogs`
- Migrated admin modules to repository-driven flows:
  - Products table, bulk toggle, duplicate, soft delete
  - Product editor create/update persistence
  - Inventory table flattened rows + inline stock update + stock logs panel
- Migrated storefront catalog reads to repository-driven data:
  - `/`
  - `/:category`
  - `/:category/:subcategory`
  - `/products/:slug`
- Added Convex bootstrap artifact:
  - `convex.json`
- Added Convex codegen script:
  - `convex:codegen`

## In Progress / Pending
- Stage 2: Better Auth integration with custom Convex adapter.
- Replace cookie-shim auth/session logic with Better Auth session flow.
- Implement full `/api/auth/[...all]` handler wiring for Better Auth.
- Route guard migration to Better Auth-backed session + role sync.

## Quality Checks
- `typecheck`: passed
- `test`: passed
- `build`: passed
- `format:check`: passed
- `lint`: passes with one warning (TanStack `useReactTable` React Compiler compatibility warning)

## Risks / Notes
- Convex codegen cannot run until `CONVEX_DEPLOYMENT` is configured.
- Current remaining mock-data imports are outside migrated Stage 1 scope (account/cart/checkout and some admin modules not yet migrated).
- Stage 2 is required to complete auth hardening and remove compatibility session shim.
