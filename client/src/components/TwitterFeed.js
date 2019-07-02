import React from 'react';
// import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const TwitterFeed = () => {
    return (
        <div>
            <TwitterTweetEmbed tweetId={'1145709555327918080'} />
        </div>
    )
}

export default TwitterFeed
