import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    users: (_, args, context) => context.prisma.user.findMany(),
  },

  Mutation: {
    newUserRequest: (_, args, context) => {
      return context.prisma.user.upsert({
        where: { id: "" },
        update: {},
        create: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
          password: args.password,
        },
      });
    },
  },
};
