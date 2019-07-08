import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getTwitterFeed} from '../actions/twitter';
// import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Spinner from './Spinner'

const TwitterFeed = ({tweets, getTwitterFeed}) => {
    useEffect(() => {
        getTwitterFeed();
    }, [getTwitterFeed])

    const distinctTweetIds = [...new Set(tweets.tweets.map(tweet => (tweet.retweeted_status? tweet.retweeted_status.id_str : tweet.id )))];
    
    return (
        <div>
            {tweets.loading? <Spinner /> : (
                distinctTweetIds.map(id => (
                    <TwitterTweetEmbed key={id} tweetId={id} />
                ))
            )}
        </div>
    )
}

const mapStateToProps = state => ({
    tweets: state.tweets
})

export default connect(mapStateToProps, {getTwitterFeed})(TwitterFeed)
