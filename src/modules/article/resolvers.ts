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
          content: args.content,
          description: args.description,
          title: args.title,
          createdAt: args.createdAt,
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
          content: args.content,
          description: args.description,
          title: args.title,
          createdAt: args.createdAt,
        },
      });
    },
  },
};
