/* eslint-disable @typescript-eslint/no-misused-promises */

import { PrismaClient } from "@prisma/client";
import express, { type NextFunction, type Request, type Response } from "express";
import { graphql } from "graphql";

import { schema } from "./graphql/schema.js";
import type { Context, JSONObject } from "./types/index.js";

type RequestBody = {
  operationName: string | undefined;
  query: string;
  variables: JSONObject | undefined;
};

const contextValue: Context = {
  prisma: new PrismaClient(),
};

const cors = (request: Request, response: Response, next: NextFunction) => {
  response
    .setHeader("Access-Control-Allow-Headers", "Content-Type")
    .setHeader("Access-Control-Allow-Methods", "POST")
    .setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN ?? "*");
  next();
};

const makeApp = async () => {
  const app = express();

  app.use(cors);

  app.options("/api", (request: Request, response: Response) => {
    response.status(204).send(null);
  });

  app.post("/api", async (request: Request, response: Response) => {
    const body = request.body as RequestBody;

    const result = await graphql({
      contextValue,
      operationName: body.operationName,
      schema,
      source: body.query,
      variableValues: body.variables,
    });

    response.status(200).json(result);
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
