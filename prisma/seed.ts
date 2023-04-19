import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
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

  await prisma.document.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "Bonjour",
      category: "Dev",
      type: "Word",
    },
  });

  await prisma.document.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "Facture",
      category: "Formation",
      type: "Excel",
    },
  });

  await prisma.document.upsert({
    where: { id: "" },
    update: {},
    create: {
      name: "Hello",
      category: "Audit",
      type: "PDF",
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
