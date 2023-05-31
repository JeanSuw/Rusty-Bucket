const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    createdAt: String!
  }

  type Bucket {
    id: ID!
    title: String!
    description: String!
    status: String!
    dueDate: String
    priority: Int!
    isOverDue: Boolean!
    notes: [Note!]!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    buckets: [Bucket!]!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    buckets: [Bucket!]!
    bucket(id: ID!): Bucket
    user(id: ID!): User
    currentUser: User
    usersWithBuckets: [User!]!
  }

  type Mutation {
    addUser(email: String!, username: String!, password: String!): Auth!
    signIn(email: String!, password: String!): Auth!
    createBucket(title: String!, description: String!, status: String!, dueDate: String, priority: Int!): Bucket!
    updateBucket(id: ID!, title: String, description: String, status: String, dueDate: String, priority: Int): Bucket
    deleteBucket(id: ID!): Bucket
    addNoteToBucket(bucketId: ID!, content: String!): Note!
    deleteNoteFromBucket(bucketId: ID!, noteId: ID!): Note
  }
`;

module.exports = typeDefs;
