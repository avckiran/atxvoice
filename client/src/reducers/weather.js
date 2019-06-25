import {
    GET_CURRENT_WEATHER,
    GET_CITY
} from '../actions/types';

const initialState = {};

export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_CURRENT_WEATHER : return {
            ...state,
            weather: payload
        }
        case GET_CITY : return {
            ...state,
            location: payload
        }
        default: return state;
    }
}