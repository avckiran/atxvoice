import {
    USER_REGISTERED,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    LOGIN_SUCCESS,
    USER_DELETED,
    USER_UPDATED,
    FILE_UPLOADED
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading:true,
    userInfo: null,
    fileUploaded: false,
    uploadedFile:{
        filePath: '',
        fileName:''
    }
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
        case USER_UPDATED:
        case USER_LOADED:
            return ({
                ...state,
                isAuthenticated: true,
                loading: false,
                userInfo: payload.user
            })
        
        case AUTH_ERROR: 
                return({
                    ...state,
                    token: null,
                    isAuthenticated: false
                })
        case USER_DELETED:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: true,
                isAuthenticated: false,
                userInfo: null
            }
        
        case FILE_UPLOADED:
            return{
                ...state,
                fileUploaded: true,
                uploadedFile: payload
            }

        default: return state

    }

}