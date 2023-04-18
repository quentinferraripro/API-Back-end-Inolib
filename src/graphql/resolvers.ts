import { resolvers as scalarResolvers } from "graphql-scalars";

import { Context } from "../index.js";
import type { Resolvers } from "../types/codegen.js";

import { ContactRequest } from "@prisma/client";

export const resolvers: Resolvers = {
  ...scalarResolvers,

  Query: {
    contactCategories: (_, _args, _context) => {
      const context = _context as Context;

      return context.prisma.contactCategory.findMany();
    },
  },

  Mutation: {
    newContactRequest: (_, _args, _context) => {
      const context = _context as Context;

      console.log("args:", _args);
      console.log("context:", context);

      let contactRequest: ContactRequest;

      context.prisma.contactRequest
        .upsert({
          where: { id: "" },
          update: {},
          create: {
            categoryId: _args.categoryId,
            companyName: _args.companyName,
            lastName: _args.lastName,
            firstName: _args.firstName,
            email: _args.email,
            phone: _args.phone,
            message: _args.message,
          },
        })
        .then((_contactRequest) => {
          contactRequest = _contactRequest;
        })
        .catch((error) => {
          console.error("error:", error);
        });

      return contactRequest;
    },
  },
};
