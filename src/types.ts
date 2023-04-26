import type { PrismaClient } from "@prisma/client";
import type { Transporter } from "nodemailer";

export type Context = {
  mailer: Transporter;
  prisma: PrismaClient;
};
