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
      }
      appliedJobs {
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
      }
    }
  }
`;

export const GET_ALL_JOBS = gql`
{
  allJobs {
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
  }
}
`;

export const GET_SEARCH_JOBS = gql`
query searchJobs($title: String, $location: String, $type: String ) {
  searchJobs(title: $title, location: $location, type: $type) {
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
  }
}
`;

export const GET_JOB = gql`
query job($id: String!) {
  job(id: $id) {
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
  }
}
`;