import { resolvers as scalarResolvers } from "graphql-scalars";

export const resolvers = {
  ...scalarResolvers,

  Query: {
    contactCategories: (obj, args, context) => context.prisma.contactCategory.findMany(),
  },

  Mutation: {
    newContactRequest: (obj, args, context) => {
      context.prisma.contactRequest
        .upsert({
          where: { id: "" },
          update: {},
          create: {
            categoryId: args.categoryId,
            companyName: args.companyName,
            lastName: args.lastName,
            firstName: args.firstName,
            email: args.email,
            phone: args.phone,
            message: args.message,
          },
        })
        .then((contactRequest) => {
          console.log("success:", contactRequest);
          return contactRequest;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
