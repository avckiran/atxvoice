import {combineReducers} from 'redux';
import weather from './weather';
import alerts from './formAlert';

export default combineReducers({
    weather,
    alerts
})