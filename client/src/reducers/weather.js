import {
    GET_CURRENT_WEATHER
} from '../actions/types';

const initialState = {};

export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_CURRENT_WEATHER : return {
            ...state,
            weather: payload
        }
        default: return state;
    }
}