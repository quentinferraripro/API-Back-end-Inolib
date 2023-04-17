import { PrismaClient } from "@prisma/client";
import express from "express";
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers as resolvers$1, typeDefs as typeDefs$1 } from "graphql-scalars";
const resolvers = {
  ...resolvers$1,
  Query: {
    greetings: () => "Hello, GraphQL!"
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
  response.setHeader("Access-Control-Allow-Headers", "Content-Type").setHeader("Access-Control-Allow-Methods", "GET, POST").setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
  next();
};
const makeApp = async () => {
  const app = express();
  app.use(cors);
  app.get("/", (request, response, next) => {
    const { query: queryString } = request;
    if (queryString.query === void 0) {
      response.status(400).json({
        error: "GET ?query= missing",
        status: {
          code: 400,
          message: "Bad Request"
        }
      });
      return;
    }
    let source;
    if (queryString.query.constructor === Array) {
      const query = queryString.query[queryString.query.length - 1];
      if (query.constructor === String) {
        source = query;
      } else {
        source = JSON.stringify(query);
      }
    } else {
      if (queryString.query.constructor === String) {
        source = queryString.query;
      } else {
        source = JSON.stringify(queryString.query);
      }
    }
    graphql({
      contextValue,
      schema,
      source
    }).then((result) => {
      response.status(200).json(result);
    }).catch(next);
  });
  app.options("/", (request, response) => {
    response.status(204).send(null);
  });
  app.post("/", (request, response, next) => {
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
