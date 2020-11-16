import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { UPDATE_JOB, REMOVE_JOB } from '../utils/mutations';
import { Form, Card, Image, Button, Typography, Row, Col, Input, Checkbox } from 'antd';
// import { searchGithubJobs } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ME, MY_JOBS, ALL_JOBS } from '../utils/queries';
import { removeJobId } from '../utils/localStorage';
import { render } from 'react-dom';
// import { getSavedJobIds } from '../utils/localStorage';
const { Paragraph, Link } = Typography;
const { TextArea } = Input;

const SavedJobs = (props) => {
    const [updateJob, { error }] = useMutation(UPDATE_JOB);
    const [removeJob, { e }] = useMutation(REMOVE_JOB);
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || {};
    console.log(userData);

    
        const handleUpdateJob = async(_id, applied, application_date, notes) => {
        console.log(application_date);
        console.log(notes);
        console.log(applied);
        const jobToUpdate = props.jobs.find((job) => job._id === _id);

        if (applied === true) {
            jobToUpdate.applied = true;
        }
        if (application_date !== "") {
            jobToUpdate.application_date = application_date
        }
        if (notes !== "") {
            jobToUpdate.notes = notes
        }
        console.log(jobToUpdate);
                //get token
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (!token) {
                    return false;
                }
        
                console.log(token);
        
                try {
                    const { data } = await updateJob({
                        variables: { _id: jobToUpdate._id, applied: jobToUpdate.applied, application_date: jobToUpdate.application_date, notes: jobToUpdate.notes }
                    });
          console.log(data);
                    if (error) {
                        throw new Error('something went wrong!');
                    }
        
                } catch (error) {
                    console.error(error);
                }
            };

    const handleRemoveJob = async(_id) => {
        console.log(_id);

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(token);
        
        if(!token) {
            return false;
        }

        try { 
            const { jobInfo } = await removeJob({
                variables: { _id }
            })

            if (error) {
                throw new Error('Something went wrong removing this job')
            }

            props.onJobRemoved(_id)
            //remove job's id from local storage
            removeJobId(_id)

              

        } catch (err) {
            console.error(err);
        }

    }    

    if (loading) return 'Loading...';

      return (
        <>
            {Auth.loggedIn() && props.jobs && props.jobs.length ?
            // userData && userData.savedJobs && userData.savedJobs.length ? 
                    <div className="saved-jobs-wrapper">

                        {props.jobs.map(job => (
                                <Card
                                 key={job.id}>
                                    <div>
                                        <Image width={50} src={job.company_logo}
                                        ></Image> <br />
                                        <Link href={job.url} target="_blank">{job.title} </Link><br />
                                        {job.type} <br />
                              Company name: <Link href={job.company_url} target="_blank">{job.company}</Link><br />
                                        {job.location}<br />
                                        <Button onClick={() => handleRemoveJob(job._id)}>Remove Job</Button>
                                        {job.applied ? (
                                            
                                            <p>You applied for this job. Good luck!</p>
                                        ):(
                                           
                                <Form>
                                                    <Form.Item>I've applied for this job
                                                        <Checkbox id="applied" onClick={() => {
                                    let applied = false;
                                    let checked = document.getElementById("applied").checked;
                                    if (checked === true) {
                                        applied = true
                                    }  
                                       handleUpdateJob(job._id, applied)
                                }}/>
                                    </Form.Item>
                                    </Form>
                               
                                    )}
                                    {job.applied && job.application_date &&
                                        <p>Applied on: {job.application_date}</p>}
                                        
                                    {job.notes && <p>Notes: {job.notes}</p>}
                                    
                                    {job.applied && !job.application_date && 
                                    
                                    <>
                                        <Form>
                                                    <Form.Item>Date Applied:
                                        <Input id="Application_Date" />
                                                    </Form.Item>
                                                    <Form.Item>Notes
                                            <TextArea id="Job_Notes" rows={5} />
                                                    </Form.Item>
                                                </Form>
                                            <Button onClick={() => {
                                                    let applied = true;
                                                    let application_date = document.getElementById("Application_Date").value
                                                    console.log(application_date);
                                                    let notes = document.getElementById("Job_Notes").value
                                                    console.log(notes);
                                                    handleUpdateJob(job._id, applied, application_date, notes)
                                                   
                                                }}>Submit</Button>
                                        </>
}
                                                                                                           </div>
                            </Card>
                        ))
                    };

                          </div>
       : ( <p className="saved-title-description"> You don't have any saved jobs. Please log in to save.</p> 
      )
                };
         </>  );
};


export default SavedJobs;

