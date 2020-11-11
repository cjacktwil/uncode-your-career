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
}
`;

export const UPDATE_JOB = gql`
mutation updateJob($applied: Boolean, $app_date: String, $notes: String ) {
  updateJob(applied: $applied, application_date: $app_date, notes: $notes) {
    _id
    username
    email
    savedJobs {  
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
}
`;
// export const APPLIED_JOB = gql`
// mutation appliedJob($input: jobInput!) {
//   appliedJob(input: $input) {
//     _id
//     username
//     email
//     appliedJobs {
//       id
//       type
//       url
//       created_at
//       company
//       location
//       title
//       description
//       company_url
//       company_logo
//       how_to_apply
//     }
//   }
// }
// `;

export const REMOVE_JOB = gql`
mutation removeJob($id: String!) {
  removeJob(id: $id) {
    _id
    username
    email
    savedJobs {
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
}
`;


// _id
// username
// email
// savedJobs {
// }