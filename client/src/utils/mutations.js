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
      id
      type
      url
      created_at
      company
      location
      title
      description
      company_url
      company_logo
      how_to_apply
      applied
      application_date
      notes
  }
}
`;

export const UPDATE_JOB = gql`
mutation updateJob($_id: ID!, $applied: Boolean, $application_date: String, $notes: String ) {
  updateJob(_id: $_id, applied: $applied, application_date: $application_date, notes: $notes) {
      _id
      id
      type
      url
      created_at
      company
      location
      title
      description
      user_id
      company_url
      company_logo
      how_to_apply
      applied
      application_date
      notes
  }
}
`;

export const REMOVE_JOB = gql`
mutation removeJob($_id: ID!) {
  removeJob(_id: $_id) {
      _id
      id
      type
      url
      created_at
      company
      location
      title
      description
      user_id
      company_url
      company_logo
      how_to_apply
      applied
      application_date
      notes
  }
}
`;
