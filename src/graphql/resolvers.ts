import { resolvers as scalarResolvers } from "graphql-scalars";

export const resolvers = {
  ...scalarResolvers,

  Query: {
    greetings: () => "Hello, GraphQL!",
  },
};
