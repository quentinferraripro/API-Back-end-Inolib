import { PrismaClient } from "@prisma/client";
import express, { type NextFunction, type Request, type Response } from "express";
import { graphql } from "graphql";

import { schema } from "./graphql/schema";
import type { JSONObject } from "./types";

type RequestBody = {
  operationName: string | undefined;
  query: string;
  variables: JSONObject | undefined;
};

const contextValue = {
  prisma: new PrismaClient(),
};

const cors = (request: Request, response: Response, next: NextFunction) => {
  response
    .setHeader("Access-Control-Allow-Headers", "Content-Type")
    .setHeader("Access-Control-Allow-Methods", "GET, POST")
    .setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
  next();
};

const makeApp = async () => {
  const app = express();

  app.use(cors);

  app.get("/api", (request: Request, response: Response, next: NextFunction) => {
    const { query: queryString } = request;

    if (queryString.query === undefined) {
      response.status(400).json({
        error: "GET ?query= missing",
        status: {
          code: 400,
          message: "Bad Request",
        },
      });
      return;
    }

    let source: string;

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
      source,
    })
      .then((result) => {
        response.status(200).json(result);
      })
      .catch(next);
  });

  app.options("/api", (request: Request, response: Response) => {
    response.status(204).send(null);
  });

  app.post("/api", (request: Request, response: Response, next: NextFunction) => {
    const body = request.body as RequestBody;

    graphql({
      contextValue,
      operationName: body.operationName,
      schema,
      source: body.query,
      variableValues: body.variables,
    })
      .then((result) => {
        response.status(200).json(result);
      })
      .catch(next);
  });

  app.all("*", (request: Request, response: Response) => {
    response.status(405).json({
      error: "Only GET and POST methods are allowed",
      status: {
        code: 405,
        message: "Method Not Allowed",
      },
    });
  });

  return Promise.resolve(app);
};

const appPromise = makeApp();

export const viteNodeApp = appPromise;

export default async (request: Request, response: Response) => {
  const app = await appPromise;

  app(request, response);
};
