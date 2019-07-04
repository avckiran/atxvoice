import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

const Profile = ({user}) => {
    return(
        <Fragment>
            <div className="container mt-4">
                {user.isAuthenticated? (<div>
                <div className="ml-auto mb-4 text-right">
                    <button className="btn btn-outline-dark btn-sm mr-2"> <i className="fas fa-pencil-alt"></i> Edit Account</button>
                    <button className="btn btn-danger btn-sm"> <i className="fas fa-trash-alt"></i> Delete Account</button>
                </div>
                <div className="d-flex justify-content-between">
                    <div>
                        <h4 className="display-4">{`${user.userInfo.firstName} ${user.userInfo.lastName}`}</h4>
                        <p className="lead">{user.userInfo.location}</p>
                        <p><span className="h6">Email: </span>{user.userInfo.email}</p>
                    </div>
                    <div>
                        <img src={user.userInfo.profileImage} alt="profile_img"  width="100px" className="img-fluid rounded"/>
                        <button className="btn btn-outline-dark btn-block btn-sm mt-3">Change</button>
                    </div>
                </div>
                <hr/>
                <p className="lead"><span className="h5"></span>{user.userInfo.bio}</p>
                <p className="mb-2"><span className="h5">Interests: </span><br />
                {user.userInfo.interests.map(interest => (
                    <div className="text-secondary ml-2 mt-2"><i className="far fa-check-circle mr-2"></i>{' '}{interest.toUpperCase()}</div>
                ))}</p>

                    
                    
                    {/* First Name: {user.userInfo.firstName}
                    Last Name: {user.userInfo.lastName}
                    Email: {user.userInfo.email}
                    Location: {user.userInfo.location}
                    Bio: {user.userInfo.bio}
                    Interests: {user.userInfo.interests} */}


                </div>) : (<div className="text-center mt-5"> 
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)}

            </div>
        </Fragment>
        
    )

}

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading
})

export default connect(mapStateToProps)(Profile);
