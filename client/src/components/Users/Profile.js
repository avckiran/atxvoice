import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Navbar from '../Navbar';

const Profile = ({user, loading}) => {
    return(
        <Fragment>
        <Navbar />
            <div className="container mt-4">
                User profile goes here
            </div>
        </Fragment>
        
    )

}

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading
})

export default connect(mapStateToProps)(Profile);
