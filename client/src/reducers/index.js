import {combineReducers} from 'redux';
import weather from './weather';
import alerts from './formAlert';
import user from './users';
import tweets from './tweets';
import posts from './posts';

export default combineReducers({
    weather,
    alerts,
    user,
    tweets,
    posts
})