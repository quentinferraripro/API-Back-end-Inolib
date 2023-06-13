import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ContactRequest
  await prisma.contactRequest.deleteMany();

  // ContactCategory
  await prisma.contactCategory.deleteMany();

  await prisma.contactCategory.upsert({
    where: { name: "Audit" },
    update: {},
    create: {
      name: "Audit",
    },
  });

  await prisma.contactCategory.upsert({
    where: { name: "Développement" },
    update: {},
    create: {
      name: "Développement",
    },
  });

  await prisma.contactCategory.upsert({
    where: { name: "Formation" },
    update: {},
    create: {
      name: "Formation",
    },
  });

  // Document
  await prisma.document.deleteMany();
  await prisma.document.findUnique();

  await prisma.document.create({
    data: {
      title: "Bonjour",
      content: "Dev",
    },
  });

  await prisma.document.create({
    data: {
      title: "Facture",
      content: "Formation",
    },
  });

  await prisma.document.create({
    data: {
      title: "Hello",
      content: "Audit",
    },
  });

  if (!document) {
    throw new Error("Document not found");
  }

  // User
  await prisma.user.deleteMany();

  await prisma.user.upsert({
    where: { id: "" },
    update: {},
    create: {
      firstName: "Quentin",
      lastName: "Ferrari",
      email: "quentinferrari@gmail.com",
      phone: "0123456789",
      password: "helloworld",
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Done.");
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.error(error);
    process.exit(1);
  });
