
import ReactHtmlParser from 'react-html-parser';
import React, { useState } from 'react';

import { Button, Input, Form, Checkbox, Typography, Carousel, Image, Row, Col, Divider } from "antd";
import '../index.css';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_JOB } from '../utils/mutations';
// import { getSavedJobIds, saveJobIds } from '../utils/localStorage';
const { Link } = Typography;

const SearchForm = (props) => {

    //const [text, setArray] = useState({ jobs: [] });

    const [descriptionmode, showDescription] = useState(false)

    // const [searchedJobs, setSearchedJobs] = useState({ jobs: [] });
    const [searchedJobs, setSearchedJobs] = useState([]);
    // const [savedJobIds, setSavedJobIds] = useState(getSavedJobIds());
    // useEffect(() => {
    //     return () => saveJobIds(savedJobIds);
    // });
    const [saveJob, { error }] = useMutation(SAVE_JOB);
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || {};
    console.log(userData);

    const searchJobs = async (description, location, fullTime) => {

        let searchBody = "";
        if (description !== "") {
            searchBody = searchBody + "&description=" + description;
        }
        if (location !== "") {
            searchBody = searchBody + "&location=" + location;
        }
        if (fullTime) {
            searchBody = searchBody + "&full_time=true";
        }
        var res = encodeURI(searchBody)
        const response = await fetch(`http://localhost:3001/api?${res}`)
        let jobs = (await response.json());
        if (jobs.length === 0) {
            window.alert("no results found, please change search or leave one of the fields empty")
        }
        // setSearchedJobs({ jobs: respjson })
        setSearchedJobs(jobs);
        console.log(jobs);

    };

    const handleSaveJob = async (jobId) => {
        console.log(jobId);

        // declare variable to hold selected job information
        const jobToSave = searchedJobs.find((job) => job.id === jobId);
        console.log(jobToSave);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        console.log(token);

        try {
            const { data } = await saveJob({
                variables: { input: jobToSave }
            });

            if (error) {
                throw new Error('something went wrong!');
            }
            //add jobToSave id to saved jobs array
            // setSavedJobIds([...savedJobIds, jobToSave.id]);
            // console.log(savedJobIds);

        } catch (error) {
            console.error(error);
        }
    };


    const showDetails = (job) => {
        props.history.push('/details',
            { job: job }
        )
    }
    const contentStyle = {
        lineHeight: '25px',
        padding: '20px',
        height: '250px'
    };

    const contentStyleRight = {
        lineHeight: '20px',
        padding: '20px',
        height: '250px'
    };

    return (

        <>
            <Form className="search-form"
            >
                <Form.Item id="description" style={{ color: 'white', fontSize: "12px", padding: '10px 0px 0px 12px' }}>
                    Description
    <Input id="Description" />
                </Form.Item>
                <Form.Item id="location" style={{ color: 'white', fontSize: "12px", padding: '10px 0px 0px 12px' }}>
                    Location
    <Input id="Location" />
                </Form.Item>
                <Form.Item id="full time" style={{ color: 'white', fontSize: "12px", padding: '10px 0px 0px 12px' }}>
                    Full Time
        <Checkbox id="FullTime" style={{ padding: '10px' }} />

                    <Button id="searchButton" onClick={() => {
                        let desc = document.getElementById("Description").value
                        let loc = document.getElementById("Location").value
                        let fullTime = "";
                        let checked = document.getElementById("FullTime").checked
                        if (checked === true) {
                            fullTime = "true"
                        }
                        else {
                            fullTime = "false"
                        }
                        searchJobs(desc, loc, fullTime)
                    }}>Search</Button>
                </Form.Item>
            </Form>
            <div className="car-container">
                {searchedJobs.length ?
                    <Carousel className="search-result" autoplay>
                        {/* {searchedJobs.jobs.slice(0,3).map(job => ( */}
                        {searchedJobs.map(job => (
                            <>

                                <div className="extender">
                                    <Row justify="space-around" align="top">
                                        <Col span={8}>
                                            <div value={60} style={contentStyle} key={job.id}>

                                                <Image width={50} src={job.company_logo}
                                                ></Image> <br />
                                                <Link href={job.url} target="_blank">{job.title} </Link><br />
                                                {job.type} <br />
                              Company name: <Link href={job.company_url} target="_blank">{job.company}</Link><br />
                                                {job.location}<br />
                                                <Button className="savejob-button" onClick={() => handleSaveJob(job.id)}>Save Job</Button>
                                            </div>
                                        </Col>

                                        <Col span={16}>

                                            <div value={100} style={contentStyleRight} className="shortDesc">

                                                <div className="desc-text"  >
                                                    <div className="description-link">
                                                        <Link className="extender-link"
                                                            onClick={() => showDetails(job)}
                                                        >
                                                            Click here to see full description.
                                </Link>
                                                    </div>
                                                    {ReactHtmlParser(job.description)}
                                                </div>

                                            </div>
                                        </Col>

                                    </Row>

                                </div>

                            </>
                        ))}

                    </Carousel>

                    : <div id="start"> 
                    <p>Start your job</p>
                      search now! </div>}
            </div>
            <div className="mobile-view">
                {searchedJobs.length ?
                    <Carousel className="search-result" autoplay>
                        {/* {searchedJobs.jobs.slice(0,3).map(job => ( */}
                        {searchedJobs.map(job => (
                            <>
                                        <Image width={50} src={job.company_logo}
                                        ></Image> <br />
                                        <Link href="{job.url}" target="_blank">{job.title} </Link><br />
                                        {job.type} <br />
                              Company name: <Link href="{job.company_url}" taret="_blank">{job.company}</Link><br />
                                        {job.location}<br />
                                        <Button className="savejob-button" onClick={() => handleSaveJob(job.id)}>Save Job</Button><br />
                                
                                                <Link className="extender-link"
                                                    onClick={() => showDetails(job)}
                                                >
                                                    Click here to see full description.
                                </Link>
                                

                            </>
                        ))}

                    </Carousel>

                    : <div id="start"> Start your job search now! </div>}
            </div>
        </>
    );
};

export default SearchForm;