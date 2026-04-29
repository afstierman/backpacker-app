import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { ApolloServer } from "@apollo/server";
import { destinationResolvers } from "./graphql/resolvers/destination.resolver";
import { createContext } from "./graphql/context";
import { readFileSync } from "fs";
import { join } from "path";

const typeDefs = readFileSync(
  join(__dirname, "./graphql/schema/destination.graphql"),
  "utf-8",
);

async function startServer() {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers: destinationResolvers,
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
    return c.html(`
      <!DOCTYPE html>
      <html>
        <body style="margin:0">
          <div id="sandbox" style="position:fixed;height:100%;width:100%"></div>
          <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
          <script>
            new window.EmbeddedSandbox({ target: '#sandbox', initialEndpoint: 'http://localhost:4000/graphql' })
          </script>
        </body>
      </html>
    `);
  });

  serve({ fetch: app.fetch, port: 4000 }, () => {
    console.log("Backend running on http://localhost:4000");
    console.log("GraphQL sandbox at http://localhost:4000/graphql");
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
