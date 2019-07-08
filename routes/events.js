const express = require('express');
const router = express.Router();
const config = require('../config/config');
const axios = require('axios');

const headerConfig = {
    headers:{
        'Authorization': `Bearer ${config.eventbriteKey}`
    }
}
const url = 'https://www.eventbriteapi.com/v3/events/search?location.address=austin&location.within=30mi&expand=venue&sort_by=date&include_adult_events=false';

router.get('/', async(req,res)=>{
    try{
        const output = await axios.get(url, headerConfig);
        if(output.data.events){
            res.json(output.data.events);
        }
    }catch(err){
        console.error(err);
    }

})



module.exports = router;
