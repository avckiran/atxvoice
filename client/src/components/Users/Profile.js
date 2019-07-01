import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Navbar from '../Navbar';

const Profile = ({user, loading}) => {
    return(
        <Navbar />
        
    )

}

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading
})

export default connect(mapStateToProps)(Profile);
