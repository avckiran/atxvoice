import React, {Fragment, useEffect} from 'react'
import EventsCarousel from './Events/EventsCarousel';
import BlogsArea from './Posts/BlogsArea';
import TwitterFeed from './TwitterFeed';
import {loadUser} from '../actions/user';
import {getPosts, unloadCurrentPost} from '../actions/posts';
import {connect} from 'react-redux';


const Layout = ({loadUser, isAuthenticated, getPosts, unloadCurrentPost}) => {

    useEffect(() => {
        unloadCurrentPost();
        getPosts();
        if(isAuthenticated) loadUser();
    },[isAuthenticated,loadUser, unloadCurrentPost, getPosts])

    return (
        <Fragment>
            <EventsCarousel />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-9 p-sm-2 p-md-5">
                        <BlogsArea />
                    </div>
                    <div className="col-md-3 border-left p-3 d-none d-md-block">
                        <h6 className="mb-3">Latest from Twitter:</h6>
                        <TwitterFeed />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {loadUser, getPosts, unloadCurrentPost})(Layout)
