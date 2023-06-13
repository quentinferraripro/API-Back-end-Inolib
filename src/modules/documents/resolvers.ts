import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    documents: (_, args, context) => context.prisma.document.findMany(),
  },
  Mutation: {
    newDocument: async (_, args, context) => {
      return await context.prisma.document.create({
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
    deleteDocument: async (_, args, context) => {
      return await context.prisma.document.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
