import {combineReducers} from 'redux';
import weather from './weather';
import alerts from './formAlert';
import user from './users';

export default combineReducers({
    weather,
    alerts,
    user
})