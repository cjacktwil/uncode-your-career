import gql from 'graphql-tag';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedJobs
      appliedJobs
    }
  }
`;

export const GET_ALL_JOBS = gql`
{
  allJobs {
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
`;

export const GET_SEARCH_JOBS = gql`
query searchJobs($title: String, $location: String, $type: String ) {
  searchJobs(title: $title, location: $location, type: $type) {
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
`;

export const GET_JOB = gql`
query job($job_id: String!) {
  job(job_id: $job_id) {
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
`;