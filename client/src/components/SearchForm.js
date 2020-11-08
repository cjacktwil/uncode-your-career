
import ReactHtmlParser from 'react-html-parser';
import React, { useState, useEffect } from 'react';
import { Button, Input, Form, Checkbox, Typography, Carousel, Image } from "antd";
import '../index.css';
import Auth from '../utils/auth';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { SAVE_JOB } from '../utils/mutations';
// import { getSavedJobIds, saveJobIds } from '../utils/localStorage';
const { Link } = Typography;
const SearchForm = () => {

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



    return (

        <>
            <Form className="search-form"
            >
                <Form.Item>
                    Description
    <Input id="Description" />
                </Form.Item>
                <Form.Item

                >
                    Location
    <Input id="Location" />
                </Form.Item>
                <Form.Item

                >
                    Full time?
        <Checkbox id="FullTime" />
                </Form.Item>
            </Form>
            <Button onClick={() => {
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

            {searchedJobs.length ?
                <Carousel className="search-result" autoplay>
                    {/* {searchedJobs.jobs.slice(0,3).map(job => ( */}
                    {searchedJobs.map(job => (
                        <>
                            <div key={job.id}>
                                <Image width={50} src={job.company_logo}
                                ></Image> <br />
                                <Link href="{job.url}" target="_blank">{job.title} </Link><br />
                                {job.type} <br />
                              Company name: <Link href="{job.company_url}" taret="_blank">{job.company}</Link><br />
                                {job.location}<br />
                                <Button onClick={() => handleSaveJob(job.id)}>Save Job</Button>
                            </div>
                            {descriptionmode ? (
                            <div>
                                <Button onClick={() => showDescription(false)}>Hide Description</Button>
                                { ReactHtmlParser(job.description)}
                            </div>
                        ) :
                            <div>
                                <Button onClick={() => showDescription(true)}>Full Description</Button>
                            </div>
                        }
                        </>
                    ))}
                </Carousel>
                : `Start your job search now!`}

        </>
    );
};

export default SearchForm;