import {combineReducers} from 'redux';
import weather from './weather';
import alerts from './formAlert';
import user from './users';
import tweets from './tweets';

export default combineReducers({
    weather,
    alerts,
    user,
    tweets
})