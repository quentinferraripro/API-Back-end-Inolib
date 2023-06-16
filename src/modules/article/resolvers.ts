import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    findDocument: async (_, args, context) => {
      return await context.prisma.document.findMany({
        where: {
          id: args.id,
        },
      });
    },
  },

  Mutation: {
    updateDocument: async (_, args, context) => {
      return await context.prisma.document.update({
        where: { id: args.id },
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
  },
};
