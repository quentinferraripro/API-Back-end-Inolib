import { typeDefs as scalarTypeDefs } from "graphql-scalars";

export const typeDefs = [
  ...scalarTypeDefs,

  /* GraphQL */ `
    type Query {
      contactCategories: [ContactCategory!]!
    }

    type Mutation {
      newContactRequest(
        categoryId: String!
        category: ContactCategory!
        companyName: String!
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        message: String!
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
  `,
];
