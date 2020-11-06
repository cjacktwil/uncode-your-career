import React, { useState } from 'react';
import { Button, Input, Form, Checkbox, Typography } from "antd";
import '../index.css';
const { Paragraph } = Typography;




const SearchForm = () => {

    const [text, setArray] = useState({ jobs: [] });


    const searchJobs = async (description, location, fulltime) => {
        
        let searchBody = "";
        if (description !== "") {
            searchBody = searchBody + "&description=" + description;
        }
        if (location !== "") {
            searchBody = searchBody + "&location=" + location;
        }
        if (fulltime) {
            searchBody = searchBody + "&full_time=" + fulltime;
        }
        var res = encodeURI(searchBody)
        const response = await fetch(`http://localhost:3001/api?${res}`)
        let respjson = (await response.json());
        if (respjson.length === 0){
        window.alert("no results found, please change search or leave one of the fields empty")
    }
        setArray({ jobs: respjson })

    }


    return (

        <>
            <Form 
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
                    Fuul time?
        <Checkbox id="FullTime" />
                </Form.Item>
            </Form>
            <Button onClick={() => {
                let desc = document.getElementById("Description").value
                let loc = document.getElementById("Location").value
                let fullTime = "";
                let checked = document.getElementById("FullTime").checked
                if(checked == true){
                fullTime = "true"
                }
                else{
                fullTime = "false"
                }
                searchJobs(desc, loc, fullTime)
            }}>push</Button>
            {text.jobs.map(item => (

                <Paragraph id="searchResult" key={item.id} ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                    <li>{item.title} </li>
                    <li> {item.url} </li>
                    <li> {item.type}</li>

                </Paragraph>
            ))}
        </>
    );
};

export default SearchForm;
