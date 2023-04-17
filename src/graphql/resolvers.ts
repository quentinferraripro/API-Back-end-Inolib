import { resolvers as scalarResolvers } from "graphql-scalars";

export const resolvers = {
  ...scalarResolvers,

  Query: {
    greetings: () => "Hello, GraphQL!",
    contactCategories: (obj, args, context) => context.prisma.contactCategory.findMany(),
  },
};
