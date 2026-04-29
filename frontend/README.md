# Frontend

Vite + React 18 travel cost estimator with an interactive 3D globe.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Vite + React 18 (TypeScript) |
| 3D Rendering | react-globe.gl (Three.js) |
| Styling | Tailwind CSS v4 |
| State | React Hooks + Context |
| Data Fetching | Apollo Client (GraphQL) |

---

## Project Structure

```text
frontend/
├── src/
│   ├── assets/                   # Globe textures, icons, logos
│   ├── components/
│   │   ├── Globe/                # Isolated 3D globe — owns its own state
│   │   │   ├── Globe.tsx
│   │   │   ├── Globe.context.tsx # GlobeProvider (camera, selected destination)
│   │   │   └── index.ts
│   │   ├── Search/               # Budget search form + reverse search
│   │   └── ui/                   # Shared primitives (Button, Input, Card)
│   ├── hooks/
│   │   ├── useDestinations.ts    # Fetches destination + cost data
│   │   └── useBudgetSearch.ts    # Reverse budget search ("What can I afford?")
│   ├── services/
│   │   └── apollo.client.ts      # Apollo Client setup + cache config
│   ├── types/                    # TypeScript interfaces for API responses
│   ├── utils/
│   │   ├── coordinates.ts        # Lat/lng conversions for globe arcs
│   │   └── currency.ts           # Formatting helpers
│   ├── App.tsx                   # Root layout — composes Globe + Search
│   └── main.tsx                  # React DOM mount
├── .env.example
├── tailwind.config.js
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (workspace-level)
- Backend running locally (see `/backend/README.md`)

### Local Setup

```bash
# From repo root
pnpm install

# Start dev server
pnpm --filter frontend dev
```

App runs at `http://localhost:5173` by default.

### Environment Variables

```bash
cp .env.example .env
```

```env
VITE_GRAPHQL_URL=http://localhost:4000/graphql
```

---

## Architecture Notes

### Globe is isolated

The globe lives in `src/components/Globe/` and manages its own context (selected destination, camera position, arc animations). `App.tsx` does not reach into globe internals — it communicates through `GlobeContext`. This keeps the Three.js lifecycle separate from React UI state and makes the globe swappable if you outgrow `react-globe.gl`.

### Hooks own data fetching

Components don't call Apollo directly. All GraphQL queries live in hooks:

```ts
// Good
const { destinations, loading } = useDestinations()

// Avoid
const { data } = useQuery(DESTINATIONS_QUERY) // inside a component
```

### Types are imported from shared package

API response types live in `packages/types` (workspace root), not here. Import from there:

```ts
import type { Destination, BudgetEstimate } from '@nomadcost/types'
```

---

## Scripts

```bash
pnpm dev          # Start Vite dev server
pnpm build        # Production build
pnpm preview      # Preview production build locally
pnpm lint         # ESLint
pnpm typecheck    # tsc --noEmit
```

---

## Out of Scope (for now)

Intentionally deferred — structure supports adding these without refactoring:

- Authentication UI (login/signup flows)
- Saved searches and user profiles
- Mobile app (Expo lives in `/mobile`, shares types)
- Affiliate link injection (hooks are the right place when ready)
