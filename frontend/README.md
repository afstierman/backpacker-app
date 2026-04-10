# (Cool Name) Frontend | 3D Budget Engine

**(Cool Name)** is a data-driven travel discovery application built with a React-based 3D globe. It visualizes the intersection of global flight prices and local cost-of-living data to help backpackers find the highest value destinations in real-time.

---

## 🛠 Tech Stack
* **Framework:** [Vite](https://vitejs.dev/) + **React 18** (TypeScript)
* **3D Rendering:** [react-globe.gl](https://github.com/vasturiano/react-globe.gl) (built on Three.js)
* **Styling:** **Tailwind CSS v4** (Utility-first, high-performance styling)
* **State Management:** React Hooks (Custom hooks for API orchestration)
* **Data Fetching:** Axios / Fetch API with strict TypeScript interfaces

---

## 📂 Project Structure
To maintain a separation between 3D logic and UI, follow this organizational pattern:

```text
frontend/
├── src/
│   ├── assets/           # Textures (Earth maps), Icons, and Logos
│   ├── components/       # Component-based architecture
│   ├── hooks/            # Logic for data fetching (useFlights.ts, useCOL.ts)
│   ├── services/         # Raw API configurations (api.client.ts)
│   ├── types/            # TypeScript .d.ts files for API responses
│   ├── utils/            # Math helpers (coordinate conversions, formatting)
│   ├── App.tsx           # Entry point: Orchestrates UI + Globe
│   └── main.tsx          # React DOM Mount
├── .env                  # Environment secrets (VITE_ prefixed)
├── tailwind.config.js    # Styling overrides
└── tsconfig.json         # TypeScript compiler rules