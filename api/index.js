import { PrismaClient } from "@prisma/client";
import express from "express";
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers as resolvers$1, typeDefs as typeDefs$1 } from "graphql-scalars";
const resolvers = {
  ...resolvers$1,
  Query: {
    greetings: () => "Hello, GraphQL!",
    contactCategories: (obj, args, context) => context.prisma.contactCategory.findMany()
  },
  Mutation: {
    newContactRequest: (obj, args, context) => {
      context.prisma.contactRequest.upsert({
        where: { id: "" },
        update: {},
        create: {
          categoryId: args.categoryId,
          companyName: args.companyName,
          lastName: args.lastName,
          firstName: args.firstName,
          email: args.email,
          phone: args.phone,
          message: args.message
        }
      }).then((contactRequest) => {
        console.log("success:", contactRequest);
      }).catch((error) => {
        console.error(error);
      });
    }
  }
};
const typeDefs = [
  ...typeDefs$1,
  /* GraphQL */
  `
    type Query {
      greetings: String!
      contactCategories: [ContactCategory!]!
    }

    type Mutation {
      newContactRequest(
        categoryId: String
        companyName: String
        firstName: String
        lastName: String
        email: String
        phone: String
        message: String
      ): ContactRequest!
    }

    type ContactCategory {
      id: Cuid!
      name: String!
      requests: [ContactRequest!]!
    }

    type ContactRequest {
      id: Cuid!
      categoryId: Cuid!
      category: ContactCategory!
      companyName: String!
      firstName: String!
      lastName: String!
      email: EmailAddress!
      phone: PhoneNumber!
      message: String!
      createdAt: DateTime!
    }
  `
];
const schema = makeExecutableSchema({ typeDefs, resolvers });
const contextValue = {
  prisma: new PrismaClient()
};
const cors = (request, response, next) => {
  response.setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Methods", "POST").setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
  next();
};
const makeApp = async () => {
  const app = express();
  app.use(cors);
  app.options("/api", (request, response) => {
    response.status(204).send(null);
  });
  app.post("/api", (request, response, next) => {
    const body = request.body;
    graphql({
      contextValue,
      operationName: body.operationName,
      schema,
      source: body.query,
      variableValues: body.variables
    }).then((result) => {
      response.status(200).json(result);
    }).catch(next);
  });
  app.all("*", (request, response) => {
    response.status(405).json({
      error: "Only GET and POST methods are allowed",
      status: {
        code: 405,
        message: "Method Not Allowed"
      }
    });
  });
  return Promise.resolve(app);
};
const appPromise = makeApp();
const viteNodeApp = appPromise;
const index = async (request, response) => {
  const app = await appPromise;
  app(request, response);
};
export {
  index as default,
  viteNodeApp
};
