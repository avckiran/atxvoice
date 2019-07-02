import React, {Fragment, useEffect} from 'react'
import Navbar from './Navbar';
import Header from './Header';
import BlogsArea from './BlogsArea';
import TwitterFeed from './TwitterFeed';
import {loadUser} from '../actions/user';
import {connect} from 'react-redux';


const Layout = ({loadUser, isAuthenticated}) => {

    useEffect(() => {
        if(isAuthenticated) loadUser();
    },[isAuthenticated,loadUser])

    return (
        <Fragment>
            <Navbar />
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-9 p-5">
                        <BlogsArea />
                    </div>
                    <div className="col-md-3 border-left p-3 d-none d-md-block">
                        <h6 className="mb-3">Latest:</h6>
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

export default connect(mapStateToProps, {loadUser})(Layout)
