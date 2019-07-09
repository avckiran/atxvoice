import {
    GET_CURRENT_WEATHER,
    GET_CITY
} from './types';
import axios from 'axios';
import config from '../config/config'
// import setAuthToken from '../utils/setAuthToken';

export const getCurrentWeather = (lat, long) => async dispatch => {
    try{
        const body = {lat, long}
        const res = await axios.get('/api/weather', body);
        dispatch({
            type:GET_CURRENT_WEATHER,
            payload: res.data
        })
        
    }catch(err){
        console.log("Error getting weather data:", err)
    }
}

export const getCity = (lat, long) => async dispatch => {
    try{
        const body = {lat, long}
        // const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${config.google_geocode_key}`)
        const res = await axios.get('/api/weather/city', body);
        const city = res.data.city;
        const state= res.data.state;
        // console.log(res);
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