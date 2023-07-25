import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    articles: async (_, args, context) => await context.prisma.article.findMany(),
    findArticle: async (_, args, context) => {
      return await context.prisma.article.findMany({
        where: {
          id: args.id,
        },
      });
    },
  },

  Mutation: {
    newArticle: async (_, args, context) => {
      return await context.prisma.article.create({
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
    deleteArticle: async (_, args, context) => {
      return await context.prisma.article.delete({
        where: {
          id: args.id,
        },
      });
    },
    updateArticle: async (_, args, context) => {
      return await context.prisma.article.update({
        where: { id: args.id },
        data: {
          title: args.title,
          content: args.content,
        },
      });
    },
  },
};
