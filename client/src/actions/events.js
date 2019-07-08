import {
    GET_EVENTS
} from './types';
import axios from 'axios';


export const getEvents = () => async dispatch => {
    try{
        const res = await axios.get('/api/events/');
        // console.log("action data", res.data);

        if(res){
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            })
        }
    }catch(err){
        console.error(err);
    }
}
