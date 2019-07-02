import {
    GET_POSTS,
    GET_POST,
    REMOVE_CURRENT_POST
} from '../actions/types';

const initialState = {loading: true}

export default function(state=initialState, action){
    const {type, payload} = action;
    
    switch(type){
        case GET_POSTS : 
            return{
                ...state,
                posts: payload,
                loading: false
            }
        
        case GET_POST: 
            return{
                ...state,
                onePost: payload
            }
        
        case REMOVE_CURRENT_POST:
            return{
                ...state,
                onePost: null
            }
        default: return state
    }
}