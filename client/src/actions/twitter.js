import {
    GET_TWITTER_FEED
} from './types'
import axios from 'axios';

// To get the twitter feed from backend API

export const getTwitterFeed = () => async dispatch => {
    try {
        const res = await axios.get('/api/tweets/')
        let payload = []
        res.data.latestTweets.forEach(tweet => {
            payload.push({
                id: tweet.id_str,
                text: tweet.text,
                created_date: tweet.created_at,
                user: tweet.user,
                retweeted_status: tweet.retweeted_status
            })
        })
        // console.log(payload);
        dispatch({
            type: GET_TWITTER_FEED,
            payload
        })
        }catch(err){
        console.log(err);
    }
}