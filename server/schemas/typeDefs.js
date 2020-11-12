const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    savedJobs: [Jobs]
  }

  type Jobs {
    _id: ID!
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
    applied: Boolean
    application_date: String
    notes: String
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
    applied: Boolean
    application_date: String
    notes: String
  }
  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveJob(input: jobInput!): User
    updateJob(input: jobInput!): User
    removeJob(id: String!): User
  }
`;

module.exports = typeDefs;





    // allJobs: [Jobs]
    // searchJobs(title: String, location: String, type: String): [Jobs]
    // job(id: String!): Jobs

    // applied: Boolean, application_date: String, notes: String
