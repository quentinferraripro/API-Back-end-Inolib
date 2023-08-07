import { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "./src/modules/**/*.gql",
  extensions: {
    codegen: {
      generates: {
        "./src/modules/": {
          preset: "graphql-modules",
          presetConfig: {
            baseTypesPath: "./types.ts",
            encapsulateModuleTypes: "none",
            filename: "./types.ts",
          },
          plugins: ["typescript", "typescript-resolvers"],
          config: {
            contextType: "../types#Context",
            mapperTypeSuffix: "Model",
            mappers: {
              Article: "@prisma/client#Article",
              ContactCategory: "@prisma/client#ContactCategory",
              ContactRequest: "@prisma/client#ContactRequest",
              Document: "@prisma/client#Document",
              User: "@prisma/client#User",
            },
            maybeValue: "T | null | void",
            scalars: {
              Cuid: "string",
              DateTime: "Date",
            },
            useTypeImports: true,
          },
        },
      },
    },
  },
};

export default config;
