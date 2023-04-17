import { typeDefs as scalarTypeDefs } from "graphql-scalars";

export const typeDefs = [
  ...scalarTypeDefs,

  /* GraphQL */ `
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
  `,
];
