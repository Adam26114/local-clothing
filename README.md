# Khit Myanmar E-Commerce

Admin-first e-commerce platform for a Myanmar local shirt brand, implemented with:

- Next.js 16 App Router
- Bun package manager
- Tailwind CSS + shadcn/ui
- Convex schema/function scaffolding (embedded variants model)
- Better Auth-compatible session scaffolding
- Sentry config scaffolding

## Locked Business Configuration

- Brand: `Khit`
- Pickup address: `Awbar Street, Kyauk Myoung Gyi Ward, Tamwe Township, Yangon`
- Pickup hours: `Weekdays 10:00 AM - 4:00 PM`
- Contact email: `zweaungnaing.info@gmail.com`
- Contact phone: `+95973159230`
- Initial superadmin email: `zweaungnaing.info@gmail.com`

## Key Implemented Areas

- Storefront routes:
  - `/`, `/:category`, `/:category/:subcategory`, `/products/:slug`
  - `/cart`, `/checkout`, `/order-confirmation/:id`
  - `/account`, `/account/orders`, `/account/orders/:id`
  - `/auth/login`, `/auth/register`, `/auth/forgot-password`
- Admin routes:
  - `/admin`, `/admin/orders`, `/admin/orders/:id`
  - `/admin/products`, `/admin/products/new`, `/admin/products/:id/edit`
  - `/admin/inventory`, `/admin/users`, `/admin/users/:id`, `/admin/settings`
- Middleware/admin guard and env-based superadmin bootstrap
- Reusable admin DataTable foundation with sort/filter/pagination/column visibility/row selection
- Convex schema + query/mutation scaffold using embedded variant model
- i18n dictionary scaffold (`en` and `my`) and language-toggle-ready structure

## Environment

Copy `.env.example` to `.env.local` and set values as needed.

## Commands

```bash
bun install
bun run dev
bun run lint
bun run test
bun run build
bun run format
bun run format:check
```

## Docker

```bash
docker-compose up
docker build -t myanmar-ecommerce:latest .
```

## CI

GitHub Actions workflow is at `.github/workflows/ci.yml` and runs:

1. `bun install --frozen-lockfile`
2. `bun run format:check`
3. `bun run lint`
4. `bun run test`
5. `bun run build`
