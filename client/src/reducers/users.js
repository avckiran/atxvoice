import {
    USER_REGISTERED,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    LOGIN_SUCCESS
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null
};

export default function(state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case LOGIN_SUCCESS:
        case USER_REGISTERED : 
            localStorage.setItem('token', payload.token)
            return{
                ...state,
                ...payload,
                isAuthenticated: true
            }

        case USER_LOADED:
            return ({
                ...state,
                isAuthenticated: true,
                userInfo: payload.user
            })
        
        case AUTH_ERROR: 
                return({
                    ...state,
                    token: null,
                    isAuthenticated: false
                })
            
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                userInfo: null
            }
        default: return state

    }

}