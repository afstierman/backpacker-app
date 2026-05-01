import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL;

if (!graphqlUrl || graphqlUrl.trim() === "") {
  throw new Error("Missing required environment variable: VITE_GRAPHQL_URL");
}

export const client = new ApolloClient({
  link: new HttpLink({
    uri: graphqlUrl,
  }),
  cache: new InMemoryCache(),
});
