import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { ApolloServer } from "@apollo/server";
import { cityResolvers } from "./graphql/resolvers/cities.resolver";
import { countryResolvers } from "./graphql/resolvers/countries.resolver";
import { regionResolvers } from "./graphql/resolvers/regions.resolver";
import { createContext } from "./graphql/context";
import { readFileSync } from "node:fs";
import { join } from "node:path";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getPort(): number {
  const portRaw = getRequiredEnv("PORT");
  const port = Number.parseInt(portRaw, 10);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT value: ${portRaw}`);
  }

  return port;
}

const schemaFiles = ["cities.graphql", "countries.graphql", "regions.graphql"];

const typeDefs = schemaFiles.map((schemaFile) =>
  readFileSync(join(__dirname, "./graphql/schema", schemaFile), "utf-8"),
);

const resolvers = {
  Query: {
    ...cityResolvers.Query,
    ...countryResolvers.Query,
    ...regionResolvers.Query,
  },
};

function renderGraphqlSandbox(endpoint: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <body style="margin:0">
        <div id="sandbox" style="position:fixed;height:100%;width:100%"></div>
        <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
        <script>
          new window.EmbeddedSandbox({ target: '#sandbox', initialEndpoint: '${endpoint}' })
        </script>
      </body>
    </html>
  `;
}

async function startServer() {
  const port = getPort();
  const sandboxEnabled = process.env.NODE_ENV !== "production";

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apollo.start();

  const app = new Hono();

  app.get("/health", (c) => c.json({ status: "ok" }));

  // Wire Apollo into Hono manually — no third-party integration needed
  app.post("/graphql", async (c) => {
    const body = await c.req.json();
    const result = await apollo.executeOperation(
      {
        query: body.query,
        variables: body.variables,
        operationName: body.operationName,
      },
      { contextValue: await createContext() },
    );
    return c.json(
      result.body.kind === "single" ? result.body.singleResult : result.body,
    );
  });

  // GraphQL sandbox in development
  app.get("/graphql", (c) => {
    if (!sandboxEnabled) {
      return c.notFound();
    }

    const origin = new URL(c.req.url).origin;
    return c.html(renderGraphqlSandbox(`${origin}/graphql`));
  });

  serve({ fetch: app.fetch, port }, () => {
    console.log(`Backend running on http://localhost:${port}`);
    if (sandboxEnabled) {
      console.log(`GraphQL sandbox at http://localhost:${port}/graphql`);
    }
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
