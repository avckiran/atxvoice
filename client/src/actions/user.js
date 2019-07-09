import {
    FORM_ALERT,
    USER_REGISTERED,
    USER_LOADED,
    USER_DELETED,
    USER_UPDATED,
    AUTH_ERROR,
    LOGOUT,
    LOGIN_SUCCESS,
    FILE_UPLOADED
} from './types';
import uuid from 'uuid';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'


// To display form-validation errors both client and server side
export const formAlert = msg => async dispatch => {
    if(msg){
        const alert = {
            id: uuid.v4(),
            text: msg
        }
        dispatch({
            type: FORM_ALERT,
            payload: alert
        })
    }
}

// To register a new Users
// TODO: need to securely send the form data. 
export const registerUser = (data, profileImage) => async dispatch => {
    if(data){
        try{
            const config = {
                headers:{'Content-Type': 'application/json'}
            }
            const{firstName, lastName, email, password, bio, interests, location } = data;
            const body = JSON.stringify({firstName, lastName, email, password, bio, interests, profileImage, location});
            console.log(body);
            // const res = {data:{errors:[0]}};
            const res = await axios.post('/api/user', body, config);
            const errors = res.data.errors;
            if(!errors){
                dispatch({
                    type: USER_REGISTERED,
                    payload: res.data
                })
                dispatch(loadUser());
            }else{
                Array.isArray(errors) ? res.data.errors.forEach(error => dispatch(formAlert(error.msg))): dispatch(formAlert(errors))
            }
            
        }catch(err){
            const errors = err.response.data.errors;
            if(errors){
                errors.forEach(error => dispatch(formAlert(error.msg)))
            }
        }
    }
}

//Load user's auth-token into Axios headers and user's data to State

export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res = await axios.get('/api/user/me/');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: AUTH_ERROR,
            payload: err
        })
    }

}

//Login users

export const login = ({email, password}) => async dispatch => {
    try{
        const config = {
            headers:{'Content-Type': 'application/json'}
        }
        const body = JSON.stringify({email, password})
        
        const res = await axios.post('/api/user/login', body, config)
        const errors = res.data.errors;
            if(!errors){
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                dispatch(loadUser());
            }else{
                Array.isArray(errors) ? res.data.errors.forEach(error => dispatch(formAlert(error.msg))): dispatch(formAlert(errors))
            }

    }catch(err){
        console.log(err);
    }

}

//Logout action

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}

// Delete user profile

export const deleteUser = userId => async dispatch => {
    console.log("action call received", userId);
    
    try{
        if(userId){
            const res = await axios.delete(`/api/user/delete/${userId}`);
            if(res.data.msg === 'User deleted'){
                dispatch({
                    type: USER_DELETED,
                    payload: res.data.user
                })
            }
        }
    }catch(err){
        console.error(err);
    }
}


//Edit User Profile 
export const editUser = (userId, formData) => async dispatch => {
    try{
        const res = await axios.put(`/api/user/update/${userId}`, formData);
        if(res.data.msg === 'User updated'){
            dispatch({
                type: USER_UPDATED,
                payload: res.data
            })
        }
    }catch(err){
        console.error(err);
    }
}

//Profile file upload
export const fileUpload = file => async dispatch => {
    const profilePicture = new FormData();
    if(file){profilePicture.append('file', file)};
    try{
        const res = await axios.post('/upload',profilePicture, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data.fileName){
            dispatch({
                type:FILE_UPLOADED,
                payload: res.data
            })
        }
    }catch(err){
        console.log(err);
    }
}