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
    job_id: ID!
    type: String!
    url: String!
    created_at: String
    company: String!
    location: String
    title: String!
    description: String
  }

  input jobInput {
    job_id: String!
    type: String!
    url: String!
    created_at: String
    company: String!
    location: String
    title: String!
    description: String
  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    allJobs: [Jobs]
    searchJobs(input: jobInput): [Jobs]
    savedJobs(input: jobInput): User
    job(job_id: ID!): Jobs
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveJob(input: jobInput): User
    appliedJob(input: jobInput): User
    removeJob(job_id: String!): User
  }
`;

module.exports = typeDefs;
