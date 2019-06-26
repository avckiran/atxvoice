import {
    FORM_ALERT
} from '../actions/types'

const initialState = [];

export default function (state=initialState, action){
    const {type, payload} = action;

    switch(type){
        case FORM_ALERT: 
            return [...state, payload]
        default: return state;
    }
}
