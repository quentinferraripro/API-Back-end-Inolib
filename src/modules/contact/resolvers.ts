import { Resolvers } from "./types";

export const resolvers: Resolvers = {
  Query: {
    contactCategories: (_, args, context) => context.prisma.contactCategory.findMany(),
  },

  Mutation: {
    newContactRequest: async (_, args, context) => {
      const contactRequest = await context.prisma.contactRequest.upsert({
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
      });

      await context.mailer.sendMail({
        from: "matthieu.meignan@inolib.com",
        to: "matthieu.meignan@inolib.com",
        subject: "TEST",
        text: JSON.stringify(contactRequest),
      });

      return contactRequest;
    },
  },
};
