
let fetch = require('node-fetch');



    
const jobSearch = async function(req,res){
    let desc = req.query.description || "";
    let loc = req.query.location || "";
    let full = req.query.full_time || "";
    let url = `https://jobs.github.com/positions.json?description=${desc}&location=${loc}&full_time=${full}`;
    let resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
    })
    if (!resp.ok) Promise.reject(resp.json());
    let json = await resp.json();
    res.json(json);
}
module.exports = jobSearch;