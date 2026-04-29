import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const typeDefs = `#graphql
  type Destination {
    id: String
    city: String
    country: String
    dailyCostUSD: Float
    lat: Float
    lng: Float
  }

  type Query {
    destinations: [Destination]
  }
`;

const resolvers = {
  Query: {
    destinations: () => prisma.destination.findMany(),
  },
};

const apollo = new ApolloServer({ typeDefs, resolvers });
await apollo.start();

const app = new Hono();
app.get("/health", (c) => c.json({ status: "ok" }));

serve({ fetch: app.fetch, port: 4000 }, () => {
  console.log("Backend running on http://localhost:4000");
});
