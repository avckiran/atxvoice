import {
    GET_TWITTER_FEED
} from '../actions/types';

const initialState = {
    tweets: [],
    loading: true
};

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_TWITTER_FEED : 
            return{
                ...state,
                tweets: payload,
                loading: false
            }
        default: return state
    }
}