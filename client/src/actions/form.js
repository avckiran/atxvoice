import {
    FORM_ALERT
} from './types';
import uuid from 'uuid';
import axios from 'axios';


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

export const registerUser = data => async dispatch => {
    if(data){
        try{
            const config = {
                headers:{'Content-Type': 'application/json'}
            }
            const{firstName, lastName, email, password, bio, interests, location } = data;
            const body = JSON.stringify({firstName, lastName, email, password, bio, interests, location});
            console.log(body);
            const res = await axios.post('/api/user', body, config);
            console.log(res);

        }catch(err){
            console.log(err);
        }
    }
}



