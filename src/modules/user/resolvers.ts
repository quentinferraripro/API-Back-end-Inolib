import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    users: async (_, args, context) => context.prisma.user.findMany(),
    findUser: async (_, args, context) => {
      return await context.prisma.user.findMany({
        where: {
          id: args.id,
        },
      });
    },
  },

  Mutation: {
    newUser: async (_, args, context) => {
      return await context.prisma.user.create({
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
          isAdmin: args.isAdmin,
          password: args.password,
        },
      });
    },
    deleteUser: async (_, args, context) => {
      return await context.prisma.user.delete({
        where: {
          id: args.id,
        },
      });
    },
    updateUser: async (_, args, context) => {
      return await context.prisma.user.update({
        where: { id: args.id },
        data: {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          phone: args.phone,
          isAdmin: args.isAdmin,
          password: args.password,
        },
      });
    },
  },
};
