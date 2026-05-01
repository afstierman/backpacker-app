# (Insert Cool Name Here)

> Backpacking travel cost estimator. Search by destination or reverse-search by budget — "What can I afford?"

---

## Monorepo Structure

```text
/
├── frontend/          # Vite + React 18 — interactive 3D globe UI
├── backend/           # Hono + GraphQL + Prisma — API server
├── packages/
│   └── types/         # Shared TypeScript interfaces (imported by both)
├── docker-compose.yml # Postgres + Redis for local dev
├── turbo.json         # Turborepo pipeline config
└── package.json       # pnpm workspace root
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker + Docker Compose

### Setup

```bash
# Install all dependencies
pnpm install

# Start Postgres + Redis
docker compose up -d

# Generate Prisma files
pnpm --filter backend exec prisma generate dev

# Run DB migrations
pnpm --filter backend exec prisma migrate dev

# Start all packages in dev mode
pnpm dev
```

| Service     | URL                           |
| ----------- | ----------------------------- |
| Frontend    | http://localhost:5173         |
| GraphQL API | http://localhost:4000/graphql |
| Postgres    | localhost:5432                |
| Redis       | localhost:6379                |

---

## Packages

| Package          | Description                                        |
| ---------------- | -------------------------------------------------- |
| `frontend`       | React app with globe UI and budget search          |
| `backend`        | Hono HTTP server, Apollo GraphQL, Prisma ORM       |
| `packages/types` | Shared domain types imported by frontend + backend |

---

## Key Features (MVP)

- **Destination search** — estimated daily cost by city/country
- **Reverse budget search** — enter a budget, get a ranked list of affordable destinations
- **Interactive globe** — visualize destinations geographically

---

## Scripts

Run from the repo root via Turborepo:

```bash
pnpm dev          # Dev servers for all packages (parallel)
pnpm build        # Production build all packages
pnpm lint         # Lint all packages
pnpm typecheck    # Type-check all packages
```

---

## Tech Stack Summary

| Concern  | Choice                                  |
| -------- | --------------------------------------- |
| Monorepo | Turborepo + pnpm workspaces             |
| Frontend | Vite, React 18, TypeScript, Tailwind v4 |
| API      | Hono, Apollo Server, GraphQL            |
| Database | PostgreSQL 16 (via Prisma)              |
| Cache    | Redis 7                                 |
| Jobs     | AWS SQS + Lambda                        |
| CI       | GitHub Actions                          |

---

## Development Docs

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
