import { useGraphQLModules } from "@envelop/graphql-modules";
import { PrismaClient } from "@prisma/client";
import { createApplication } from "graphql-modules";
import { createYoga } from "graphql-yoga";
import { createTransport } from "nodemailer";

import { modules } from "./modules";

console.log("MAILER_USER:", process.env.MAILER_USER);
console.log("MAILER_PASS:", process.env.MAILER_PASS);

const yoga = createYoga({
  plugins: [useGraphQLModules(createApplication({ modules }))],
  context: {
    mailer: createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      service: "Outlook365",
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    }),
    prisma: new PrismaClient(),
  },
  // cors: {
  //   allowedHeaders: ["Content-Type"],
  //   methods: ["POST"],
  //   origin: process.env.CORS_ORIGIN ?? "*",
  // },
  graphiql: process.env.VERCEL_ENV !== "production",
  graphqlEndpoint: "/",
  landingPage: false,
});

export const viteNodeApp = yoga;
export default yoga;
