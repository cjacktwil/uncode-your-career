import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_JOB = gql`
mutation saveJob($input: jobInput!) {
  saveJob(input: $input) {
    _id
    username
    email
    savedJobs {
      job_id
      type
      url
      created_at
      company
      location
      title
      description
    }
  }
}
`;

export const APPLIED_JOB = gql`
mutation appliedJob($input: jobInput!) {
  appliedJob(input: $input) {
    _id
    username
    email
    appliedJobs {
      job_id
      type
      url
      created_at
      company
      location
      title
      description
    }
  }
}
`;

export const REMOVE_JOB = gql`
mutation removeJob($job_id: String!) {
  removeJob(job_id: $job_id) {
    _id
    username
    email
    savedJobs {
      job_id
      type
      url
      created_at
      company
      location
      title
      description
    }
    appliedJobs {
      job_id
      type
      url
      created_at
      company
      location
      title
      description
    }
  }
}
`;


