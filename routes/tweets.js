const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
const config = require('../config/config');

const client = new Twitter({
    consumer_key: config.twitterKey,
    consumer_secret:config.twitterSecret,
    bearer_token: config.twitterBearerToken
})


router.get('/', async(req, res) => {

    await client.get('search/tweets', {q: '#austin', count: '50', include_entities: false}, (err, tweets) => {
        if(err) throw err;
        let returnTweets=tweets.statuses.filter(tweet => (tweet.retweet_count > 0));
        res.json({'latestTweets' : returnTweets});
    });

});


module.exports = router; 

