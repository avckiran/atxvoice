import {
    GET_CURRENT_WEATHER,
    GET_CITY
} from './types';
import axios from 'axios';
import config from '../config/config'
// import setAuthToken from '../utils/setAuthToken';

export const getCurrentWeather = (lat, long) => async dispatch => {
    try{
        const darksky_key = config.darksky_key;
        // delete axios.defaults.headers.common['x-auth-token'];
        const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darksky_key}/${lat},${long}`);
        dispatch({
            type:GET_CURRENT_WEATHER,
            payload: res.data.currently
        })
        
    }catch(err){
        console.log("Error getting weather data:", err)
    }
}

export const getCity = (lat, long) => async dispatch => {
    try{
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${config.google_geocode_key}`)
        const city = res.data.results[0].address_components[3].short_name;
        const state= res.data.results[0].address_components[5].short_name;
        dispatch({
            type: GET_CITY,
            payload: {
                city,
                state
            }
        })
    }catch(err){
        console.log(err);
    }

}