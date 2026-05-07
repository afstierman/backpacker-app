import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // add all .graphql files in the backend schema as the schema
  schema: "../backend/src/graphql/schema/*.graphql",
  documents: ["src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};
export default config;
