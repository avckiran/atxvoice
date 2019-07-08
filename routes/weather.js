const express = require('express');
const router = express.Router();
const config = require('../config/config');
const axios = require('axios');


router.get('/', async(req,res)=>{
    try{
        const darksky_key = config.darksky_key;
        // 30.399839, -97.718635
        const lat = '30.399839'; //req.lat;
        const long = '-97.718635'; // req.long;
        // const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darksky_key}/${lat},${long}`);
        const response = await axios.get(`https://api.darksky.net/forecast/${darksky_key}/${lat},${long}`);
        res.json(response.data.currently)
        
    }catch(err){
        console.error("Error getting weather data:", err)
    }
});

router.get('/city', async(req,res)=> {
    try{
        const lat = '30.399839'; //req.lat;
        const long = '-97.718635'; // req.long;
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${config.google_geocode_key}`)
        const city = response.data.results[0].address_components[3].short_name;
        const state= response.data.results[0].address_components[5].short_name;
        res.json({city, state})
    }catch(err){
        console.error("Error getting city data: ", err);
    }
})

module.exports = router;
