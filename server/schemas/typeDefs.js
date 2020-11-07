const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    savedJobs: [Jobs]
    appliedJobs: [Jobs]
  }

  type Jobs {
    id: String!
    type: String!
    url: String!
    created_at: String
    company: String!
    location: String
    title: String!
    description: String
    company_url: String
    company_logo: String
    how_to_apply: String
  }

  input jobInput {
    id: String!
    type: String!
    url: String!
    created_at: String
    company: String!
    location: String
    title: String!
    description: String
    company_url: String
    company_logo: String
    how_to_apply: String
  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    allJobs: [Jobs]
    searchJobs(title: String, location: String, type: String): [Jobs]
    job(id: String!): Jobs
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveJob(input: jobInput!): User
    appliedJob(input: jobInput!): User
    removeJob(id: String!): User
  }
`;

module.exports = typeDefs;
