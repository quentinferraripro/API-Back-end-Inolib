import { resolvers as scalarResolvers } from "graphql-scalars";

import type { Resolvers } from "../types/codegen.js";

export const resolvers: Resolvers = {
  ...scalarResolvers,

  Query: {
    contactCategories: (_, args, context) => context.prisma.contactCategory.findMany(),
  },

  Mutation: {
    newContactRequest: (_, args, context) => {
      console.log("args:", args);
      console.log("context:", context);

      // return context.prisma.contactRequest
      //   .upsert({
      //     where: { id: "" },
      //     update: {},
      //     create: {
      //       categoryId: args.categoryId,
      //       companyName: args.companyName,
      //       lastName: args.lastName,
      //       firstName: args.firstName,
      //       email: args.email,
      //       phone: args.phone,
      //       message: args.message,
      //     },
      //   })
      //   .then((result) => {
      //     return result;
      //   })
      //   .catch((error) => {
      //     console.error("error:", error);
      //   });
    },
  },
};
