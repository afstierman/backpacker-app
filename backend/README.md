# Backend

Hono + GraphQL API server for the backpacking travel cost estimator.

## Tech Stack

| Layer          | Choice                  |
| -------------- | ----------------------- |
| Runtime        | Node.js 20              |
| HTTP Framework | Hono                    |
| API            | GraphQL (Apollo Server) |
| ORM            | Prisma                  |
| Database       | PostgreSQL 16           |
| Cache          | Redis 7                 |
| Queue          | AWS SQS + Lambda        |
| Language       | TypeScript              |

---

## Project Structure

```text
backend/
├── src/
│   ├── graphql/
│   │   ├── schema/               # SDL .graphql files by domain
│   │   │   ├── destination.graphql
│   │   │   ├── budget.graphql
│   │   │   └── search.graphql
│   │   ├── resolvers/            # Thin resolvers — delegate to services
│   │   │   ├── destination.resolver.ts
│   │   │   ├── budget.resolver.ts
│   │   │   └── search.resolver.ts
│   │   └── context.ts            # Request context (db, cache, auth)
│   ├── services/                 # Business logic — framework-agnostic
│   │   ├── budget.service.ts     # Core cost estimation logic
│   │   ├── destination.service.ts
│   │   └── search.service.ts     # Reverse budget search ("What can I afford?")
│   ├── jobs/                     # SQS consumers + Lambda handlers
│   │   ├── priceSync.job.ts      # Syncs cost-of-living data
│   │   └── handler.ts            # Lambda entry point
│   ├── db/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
|   |   |   └── seed.ts           # Seeds values for testing locally
│   │   └── client.ts             # Singleton Prisma client
│   ├── cache/
│   │   └── redis.ts              # Redis client + cache helpers
│   ├── middleware/               # Hono middleware
│   │   ├── auth.ts
│   │   └── rateLimit.ts
│   ├── config/
│   │   └── env.ts                # Zod env validation
│   └── index.ts                  # App entry point
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- Docker + Docker Compose (for Postgres and Redis)
- pnpm (workspace-level)

### Local Setup

```bash
# From repo root
pnpm install

# Start Postgres + Redis
docker compose up -d

# Run migrations
pnpm --filter backend prisma migrate dev

# Start dev server
pnpm --filter backend dev

# Seed data into Docker Postgres DB
pnpm --dir backend exec prisma db seed
```

### Environment Variables

Refer to .env.example

## Architecture Notes

### Services are framework-agnostic

Business logic lives in `src/services/` and has no knowledge of GraphQL, Hono, or HTTP. Resolvers and route handlers are thin translation layers. This makes unit testing straightforward and keeps the core logic portable.

### Resolvers stay thin

```ts
// Good
const budgetResolver = {
  Query: {
    estimateCost: (_, args, ctx) => budgetService.estimate(args, ctx.db),
  },
};

// Avoid — logic creeping into resolvers
const budgetResolver = {
  Query: {
    estimateCost: (_, args, ctx) => {
      // 50 lines of calculation...
    },
  },
};
```

### Caching strategy

Cost-of-living data is cached in Redis with a 24-hour TTL. Cache keys follow the pattern `col:{citySlug}`. This avoids redundant external API calls for the same destination without stale data risk.

### Job queue

Price sync runs as a Lambda consumer on an SQS queue. For local development, jobs can be triggered manually via a dev script — no AWS required to run the app locally.

---

## Scripts

```bash
pnpm dev          # Start dev server with hot reload
pnpm build        # Compile TypeScript
pnpm start        # Run compiled output
pnpm test         # Run unit tests
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

---

## Out of Scope (for now)

These are intentionally deferred and won't require structural changes to add later:

- User authentication (auth middleware stub is in place)
- Saved searches / user accounts
- Historical price trend storage
- Full-text destination search (Postgres FTS is ready when needed)
