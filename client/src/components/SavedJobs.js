import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../index.css';
import { REMOVE_JOB } from '../utils/mutations';
import { Card, Image, Button, Typography, Row, Col, Input } from 'antd';
// import { searchGithubJobs } from '../utils/API';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
// import { getSavedJobIds } from '../utils/localStorage';
const { Paragraph, Link } = Typography;
const { TextArea } = Input;

const SavedJobs = () => {
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || {};
    console.log(userData);
    // const savedJobs = userData?.savedJobs || [''];
    // console.log(savedJobs);

    // const [removeJob, { error }] = useMutation(REMOVE_JOB);

    // const handleApplyJob = async (jobId) => {
    //     const jobToApply = userData.savedJobs.find((job) => job.id === jobId);
    //     console.log(jobToApply);

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
        {Auth.loggedIn() && userData.savedJobs.length ?
        <div className = "site-card-wrapper">
            <Row gutter={16}>
            {userData.savedJobs.map(job => (
                <>
            
                <Col span={8}> 
                <Card key={job.id}>
                {/* <div> */}
                                <Image width={50} src={job.company_logo}
                                ></Image> <br />
                                <Link href="{job.url}" target="_blank">{job.title} </Link><br />
                                {job.type} <br />
                              Company name: <Link href="{job.company_url}" taret="_blank">{job.company}</Link><br />
                                {job.location}<br />
                                {applied ? (
                                    <Form>
                                        <Form.Item>Date Applied
                                        <Input id="Application_Date" />
                                        </Form.Item>
                                        <Form.Item>Notes
                                            <TextArea id="Job_Notes" rows={5} />
                                        </Form.Item>
                                    </Form>
                                    <Button onClick={() => {
                                        //need to add application date to model and schemas - add onclick function to 
                                        //save application date and notes to db
                                    }}
                                ):
                                <Button onClick={() => clickHandler()}>I've applied for this job.</Button>
                            //add clickhandler to change applied from false to true
                                {/* </div> */}
                                };
                            </Card>
                            </Col>
                         
                            </>
                           
                    
            ))}

</Row>
                            </div>
        : "Start saving jobs!"}
        </>
    );
};

export default SavedJobs;