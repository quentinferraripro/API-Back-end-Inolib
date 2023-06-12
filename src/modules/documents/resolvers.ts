import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    documents: (_, args, context) => context.prisma.document.findMany(),
  },
  Mutation: {
    newDocumentRequest: async (_, args, context) => {
      return context.prisma.document.create({
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
  },
};
