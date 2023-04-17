import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/",
  generates: {
    "./src/types/codegen.d.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
