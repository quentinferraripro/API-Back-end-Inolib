import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    users: async (_, args, context) => await context.prisma.user.findMany(),
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
          email: args.email,
          firstName: args.firstName,
          isAdmin: args.isAdmin,
          lastName: args.lastName,
          password: args.password,
          phone: args.phone,
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
          email: args.email,
          firstName: args.firstName,
          isAdmin: args.isAdmin,
          lastName: args.lastName,
          password: args.password,
          phone: args.phone,
        },
      });
    },
  },
};
