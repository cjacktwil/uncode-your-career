import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { Card } from 'antd';
import { searchGithubJobs } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_JOB, APPLIED_JOB } from '../utils/mutations';
import { getSavedJobIds } from '../utils/localStorage';

const SearchedJobs = ({jobs}) => {

  const params = "location=remote";
  // create state for holding returned Github api data
  const [searchedJobs, setSearchedJobs] = useState([]);
  const [saveJob, { error }] = useMutation(SAVE_JOB);
    // create state to hold saved jobId values
  const [savedJobIds, setSavedJobIds] = useState(getSavedJobIds());
  useEffect(() => {
    return () => setSavedJobIds(savedJobIds);
  });

  const handleSaveJob = async (jobId) => {
    console.log(jobId);
    // declare variable to hold selected book information
    const jobToSave = searchedJobs.find((job) => job.jobId === jobId);
    console.log(jobToSave);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    console.log(token);
    //call saveBook mutation
    try {
      const { data } = await saveJob({
        variables: { input: jobToSave }
      });

      if (error) {
        throw new Error('something went wrong!');
      }
      //add bookToSave id to saved book array
      setSavedJobIds([...savedJobIds, jobToSave.jobId]);
    } catch (error) {
      console.error(error);
    }
  };
  
  // if (!jobs.length) {
  //       return <h3>No jobs meet that criteria. Please adjust your search terms.</h3>;
  //     }

//       else {
// const tabList = [
//   {
//     key: 'job_listing',
//     tab: 'Job Listing',
//   },
//   {
//     key: 'my_status',
//     tab: 'My Status',
//   },
// ];

// const contentList = {
//   tab1: <p>content1</p>,
//   tab2: <p>content2</p>,
// };

  // onTabChange = (key, type) => {
  //   console.log(key, type);
  //   this.setState({ [type]: key });
  // };
    return (
      <>
      <div>
      {jobs &&
            jobs.map(job => (
        <Card>
            
    <div>
      <h2>
        <span>{job.url}</span>{job.title}</h2>
        <p>{job.location}</p>
        <p>{job.type}</p>
        <p>{job.company}</p>
        <p>{job.created_at}</p>
        <p>{job.description}</p>
    </div>
    </Card>
            )
            )
            }
            </div>
            </>
    )
          
        };
          export default SearchedJobs;


// import React, { useState } from 'react';
// // import { Button, Input, Form } from "antd";


// const SearchedJobs = ({jobs}) => {
//     if (!jobs.length) {
//         return <h3>No jobs meet that criteria. Please adjust your search terms.</h3>;
//       }
    
//       return (
//         <div>
//           {jobs &&
//             jobs.map(job => (
//               <div key={job.job_id}>
//                 <p className="card-header">
//       <Link
//         to={`/profile/${thought.username}`}
//         style={{ fontWeight: 700 }}
//         className="text-light"
//       >
//         {thought.username}
//       </Link>{' '}
//       thought on {thought.createdAt}
//     </p>
//     <div className="card-body">
//       <Link to={`/thought/${thought._id}`}>
//         <p>{thought.thoughtText}</p>
//         <p className="mb-0">
//           Reactions: {thought.reactionCount} || Click to{' '}
//           {thought.reactionCount ? 'see' : 'start'} the discussion!
//         </p>
//       </Link>
//     </div>
//               </div>
//             ))}
//         </div>
//       );
//     };
    
//     export default ThoughtList;

// }

{/* <Card
          style={{ width: '100%' }}
          title={job.title}
          extra={<a href={job.url}>Full Job Listing</a>}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
            
    <div className="card-body">
        <p>{job.location}</p>
        <p>{job.type}</p>
        <p>{job.company}</p>
        <p>{job.created_at}</p>
        <p>{job.description}</p>
    </div>
            }
        </div>
          {contentList[this.state.key]}
        </Card>   
        </div>     
      </>
    );
  }
} */}
