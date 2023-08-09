import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  // ContactRequest
  await prisma.contactRequest.deleteMany();

  // ContactCategory
  await prisma.contactCategory.deleteMany();

  await prisma.contactCategory.create({
    data: {
      name: "Audit",
    },
  });

  await prisma.contactCategory.create({
    data: {
      name: "Développement",
    },
  });

  await prisma.contactCategory.create({
    data: {
      name: "Formation",
    },
  });

  // Article
  await prisma.article.deleteMany();

  await prisma.article.create({
    data: {
      title: "Bonjour",
      content: "Dev",
      description: "article sur le developpement",
    },
  });

  await prisma.article.create({
    data: {
      title: "Facture",
      content: "Formation",
      description: "facture de formation",
    },
  });

  await prisma.article.create({
    data: {
      title: "Hello",
      content: "Audit",
      description: "présentation des audits",
    },
  });

  // User
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      firstName: "Quentin",
      lastName: "Ferrari",
      email: "quentinferrari@gmail.com",
      phone: "0123456789",
      isAdmin: true,
      password: "helloworld",
    },
  });

  await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@gmail.com",
      phone: "0699000000",
      isAdmin: false,
      password: "hello",
    },
  });

  await prisma.user.create({
    data: {
      firstName: "User",
      lastName: "Test",
      email: "usertest@gmail.com",
      phone: "0198765432",
      isAdmin: false,
      password: "world",
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
