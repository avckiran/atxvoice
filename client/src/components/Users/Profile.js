import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteUser} from '../../actions/user';
import Spinner from '../../components/Spinner';


const Profile = ({user, deleteUser}) => {

    const deleteCurrentUser = () => {
        if (window.confirm(`Are you sure you wish to delete the Account? This can't be undone.`)) {
            deleteUser(user.userInfo._id);
        }
    }


    return(
        <Fragment>
            <div className="container mt-4">
                {user.isAuthenticated? (<div>
                <div className="ml-auto mb-4 text-right">
                    <Link to='/me/edit' className="btn btn-outline-dark btn-sm mr-2"> <i className="fas fa-pencil-alt"></i> Edit Account</Link>
                    <button onClick={()=> deleteCurrentUser()} className="btn btn-danger btn-sm"> <i className="fas fa-trash-alt"></i> Delete Account</button>
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
                <div className="mb-3"><span className="h5 mb-3">Interests: </span><br />
                {user.userInfo.interests.map(interest => (
                    <p key={interest} className="text-secondary ml-2 mt-1" style={{'fontSize':'0.8rem'}}><i className="far fa-check-circle mr-2"></i>{' '}{interest.toUpperCase()}</p>
                ))}</div>

                </div>) : (<Spinner /> )}

            </div>
        </Fragment>
        
    )

}

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading
})

export default connect(mapStateToProps, {deleteUser})(Profile);
