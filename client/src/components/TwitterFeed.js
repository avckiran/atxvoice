import React from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


const TwitterFeed = () => {
    return (
        <div>
            <TwitterTweetEmbed tweetId={'1143932160480632832'} />
        </div>
    )
}

export default TwitterFeed
