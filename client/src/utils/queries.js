import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedJobs {
        _id
      }
    }
  }
`;

export const MY_JOBS = gql`
{
  myJobs {
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

export const ALL_JOBS = gql`
{
  allJobs {
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