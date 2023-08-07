import { typeDefs } from "graphql-scalars";
import { writeFileSync } from "node:fs";

try {
  writeFileSync("./src/modules/scalars/typeDefs.gql", typeDefs.filter((value) => value !== "scalar Date").join("\n"));
} catch (error) {
  console.error(error);
}
