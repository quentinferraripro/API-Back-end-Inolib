import { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "https://api-inolib.vercel.app/api",
  extensions: {
    codegen: {
      emitLegacyCommonJSImports: false,
      generates: {
        "./src/types/codegen.d.ts": {
          plugins: ["typescript", "typescript-resolvers"],
          config: {
            contextType: "./index.js#Context",
            mapperTypeSuffix: "Model",
            mappers: {
              ContactCategory: "@prisma/client#ContactCategory",
              ContactRequest: "@prisma/client#ContactRequest",
            },
            maybeValue: "T | null | void",
          },
        },
      },
    },
  },
};

export default config;
