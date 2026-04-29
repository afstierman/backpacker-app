import { Hono } from "hono";
import { serve } from "@hono/node-server";

const app = new Hono();

app.get("/health", (c) => c.json({ status: "ok" }));

serve({ fetch: app.fetch, port: 4000 }, () => {
  console.log("Backend running on http://localhost:4000");
});
