import ReactHtmlParser from 'react-html-parser';
import React, { useState } from 'react';
import { Button, Input, Form, Checkbox, Typography, Carousel, Image, Row, Col, Divider } from "antd";
import '../index.css';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_JOB } from '../utils/mutations';
const { Link } = Typography;

const SearchForm = (props) => {

    const [searchedJobs, setSearchedJobs] = useState([]);
    const [saveJob, { error }] = useMutation(SAVE_JOB);

    const searchJobs = async (description, location, fullTime) => {
        //collect search terms
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
        //search API
        var res = encodeURI(searchBody)
        const response = await fetch(`https://murmuring-everglades-03231.herokuapp.com/api?${res}`)
        let jobs = (await response.json());
        if (jobs.length === 0) {
            window.alert("No results found. Please change search terms or leave one of the fields empty")
        }
        setSearchedJobs(jobs);
    };

    const handleSaveJob = async (jobId) => {

        // declare variable to hold selected job information
        const jobToSave = searchedJobs.find((job) => job.id === jobId);

        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        //call saveJob function on job to save
        try {
            const { data } = await saveJob({
                variables: { input: jobToSave }

            });

            if (error) {
                throw new Error('something went wrong!');
            }
            //refresh saved jobs list
            props.onJobChange(jobToSave);

        } catch (error) {
            console.error(error);
        }
    };
    //function to open details page
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
                <Form.Item id="description" style={{ color: 'white', fontSize: "14px", padding: '10px 0px 0px 12px' }}>
                    Description
    <Input id="Description" />
                </Form.Item>
                <Form.Item id="location" style={{ color: 'white', fontSize: "14px", padding: '10px 0px 0px 12px' }}>
                    Location
    <Input id="Location" />
                </Form.Item>
                <Form.Item id="full time" style={{ color: 'white', fontSize: "14px", padding: '10px 0px 0px 12px' }}>
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
                        {searchedJobs.map(job => (
                            
                                <div key={job.id} className="extender">
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
                        ))}
                    </Carousel>
                    : <div id="start">
                        <p>Start your job</p>
                        <p>search now! </p></div>}
            </div>
            <div className="mobile-view">
                {searchedJobs.length ?
                    <Carousel className="search-result" autoplay>
                        {searchedJobs.map(job => (
                            <div key={job.id}>
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
                            </div>
                        ))}
                    </Carousel>
                    : <div id="start"> Start your job search now! </div>}
            </div>
        </>
    );
};

export default SearchForm;