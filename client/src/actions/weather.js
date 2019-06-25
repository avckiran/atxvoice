import {
    GET_CURRENT_WEATHER
} from './types';
import axios from 'axios';

export const getCurrentWeather = (lat, long) => async dispatch => {
    try{
        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/baf0a73e8caa45d28c7ba1c7c9edb1d3/${lat},${long}`);
        
        dispatch({
            type:GET_CURRENT_WEATHER,
            payload: res.data.currently
        })
        
    }catch(err){
        console.log("Error getting weather data:", err)
    }
}