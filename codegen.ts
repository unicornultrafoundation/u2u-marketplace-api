
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://subgraph.uniultra.xyz/subgraphs/name/u2u/marketplace",
  documents: 'src/**/*.graphql',
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-graphql-request", "typescript-operations"]
    },
  }
};

export default config;
