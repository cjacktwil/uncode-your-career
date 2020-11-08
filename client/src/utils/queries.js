import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedJobs {
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
        notes
      }
    }
  }
`;