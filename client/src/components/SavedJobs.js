import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { UPDATE_JOB, REMOVE_JOB } from '../utils/mutations';
import { Form, Card, Image, Button, Typography, Row, Col, Input, Checkbox } from 'antd';
// import { searchGithubJobs } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';

// import { getSavedJobIds } from '../utils/localStorage';
const { Paragraph, Link } = Typography;
const { TextArea } = Input;

const SavedJobs = () => {
    // const [updateJob, { error }] = useMutation(UPDATE_JOB);
    const [removeJob, { error }] = useMutation(REMOVE_JOB);
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || {};
    console.log(userData);
    
        // const handleUpdateJob = async(jobId, applied, app_date, notes) => {
    //     console.log(jobId);
        // const jobToUpdate = userData.savedJobs.find((job) => job.id === jobId);
        // console.log(jobToUpdate);

        // let applied = false;
        // let checked = document.getElementById("applied").checked
        // if (applied === true) {
        //     applied = "true"
        // } else {
        //     applied = "false"
        // }
                // get token
                // const token = Auth.loggedIn() ? Auth.getToken() : null;

                // if (!token) {
                //     return false;
                // }
        
                // console.log(token);
        
                // try {
                //     const { data } = await updateJob({
                //         variables: { id: jobId, applied: applied, application_date: app_date, notes: notes }
                //     });
          
                //     if (error) {
                //         throw new Error('something went wrong!');
                //     }
                    //add jobToSave id to saved jobs array
                    // setSavedJobIds([...savedJobIds, jobToSave.id]);
                    // console.log(savedJobIds);
        
            //     } catch (error) {
            //         console.error(error);
            //     }
            // };
    // const savedJobs = userData?.savedJobs || [''];
    // console.log(savedJobs);

    const handleRemoveJob = async(id) => {
        console.log(id);

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(token);
        
        if(!token) {
            return false;
        }

        try { 
            const { data } = await removeJob({
                variables: { id }
            });
            if (error) {
                throw new Error('Something went wrong removing this job')
            }
        } catch (err) {
            console.error(err);
        }

    }    

    // const handleApplyJob = async (jobId) => {
    //     const jobToApply = userData.savedJobs.find((job) => job.id === jobId);
    //console.log(jobToApply);

    //     const token = Auth.loggedIn() ? Auth.getToken() : null;

    //     if (!token) {
    //         return false;
    //     }

    //     try {
    //         const { data } = await applyToJob({
    //             variables: { input: jobToApply }
    //         });

    //         if (error) {
    //             throw new Error ('Something went wrong')
    //         }

    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <>
        <h3>Saved Jobs</h3>

            {Auth.loggedIn() && userData && userData.savedJobs && userData.savedJobs.length ? 
                    <div className="site-card-wrapper">

                        {userData.savedJobs.map(job => (
                            <>
                                <Card>
                                    <div key={job.id}>
                                        <Image width={50} src={job.company_logo}
                                        ></Image> <br />
                                        <Link href={job.url} target="_blank">{job.title} </Link><br />
                                        {job.type} <br />
                              Company name: <Link href={job.company_url} target="_blank">{job.company}</Link><br />
                                        {job.location}<br />
                                        <Button onClick={() => handleRemoveJob(job.id)}>Remove Job</Button>
                                        {/* {job.applied ? (
                                            <>
                                                <Form>
                                                    <Form.Item>Date Applied
                                        <Input id="Application_Date" />
                                                    </Form.Item>
                                                    <Form.Item>Notes
                                            <TextArea id="Job_Notes" rows={5} />
                                                    </Form.Item>
                                                </Form>
                                        

                                                <Button onClick={() => {
                                                    let app_date = document.getElementById("Application_Date").value
                                                    let notes = document.getElementById("Job_notes").value
                                                    let jobId = job.id;
                                                    handleUpdateJob(jobId, app_date, notes)
                                                   
                                                }}></Button>
                                                </>
                                ) : (
                                <Form>
                                                    <Form.Item>I've applied for this job
                                <Checkbox id="applied" onClick={() => {
                                    let applied = false;
                                    let checked = document.getElementById("applied").checked;
                                    if (checked === true) {
                                        applied = true
                                    }                                   
                                    let jobId = job._id;
                                    handleUpdateJob(jobId, applied)
                                }}
                                    />
                                    </Form.Item>
                                    </Form> */}
                               
                                        {/* )}; */}
                                </div>
                            </Card>

                            </>


                        ))
                    };

                          </div>
       : ( <span className="saved-title"> You don't have any saved jobs. Please Log in to save.</span> 
      )
                };
         </>  );
};


export default SavedJobs;