import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {editUser} from '../../actions/user';
import {Redirect} from 'react-router-dom';

const EditProfile = ({userInfo, isAuthenticated, editUser}) => {

    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        bio:'',
        interests:'',
        picture:'',
        location:''
    })

    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(()=>{
        setFormData({
            firstName: userInfo? userInfo.firstName : '',
            lastName: userInfo? userInfo.lastName : '',
            bio: userInfo? userInfo.bio : '',
            interests: userInfo? userInfo.interests.join(',') : '',
            picture: userInfo? userInfo.profileImage : '',
            location: userInfo? userInfo.location : ''
        })
    },[setFormData, userInfo])

    const editCurrentUser = e => {
        e.preventDefault();
        editUser(userInfo._id, formData);
        setFormSubmitted(true);
    }

    if(formSubmitted) {
        return (<Redirect to='/me' />);
    }



    
    return (
        <div className="container mt-5">
            <div className="text-center h5">Edit User Profile</div>
            <form onSubmit ={ e => editCurrentUser(e)}>
                <div className="row">
                    <div className="col-md-6">
                        <input type="text" className="form-control mt-3" value={formData.firstName} placeholder="First Name*"
                        onChange={e=> setFormData({...formData, firstName:e.target.value}) }name="firstName"  required />
                    </div>
                    <div className="col-md-6">
                        <input type="text" value={formData.lastName} onChange={e=> setFormData({...formData, lastName:e.target.value}) } className="form-control mt-3" placeholder="Last Name" name="lastName"  />
                    </div>
                </div>
                <textarea value={formData.bio} onChange={e=> setFormData({...formData, bio:e.target.value}) } className="form-control mt-3" placeholder="Tell us a few lines about you!" name="bio"></textarea>
                <input value={formData.interests} onChange={e=> setFormData({...formData, interests:e.target.value}) } type="text" className="form-control mt-3" placeholder="Your interests" name="interests" />
                <small className="form-text text-muted ml-1 mt-0">separate by comma</small>
                <div className="custom-file mt-3">
                    <input onChange={e=> setFormData({...formData, picture:e.target.value}) }type="file" className="custom-file-input" name="picture"/>
                    <label htmlFor="image" className="custom-file-label">{formData.picture}</label>
                </div>
                <small className="form-text text-muted ml-1 mt-0">max size 3MB</small>
                {isAuthenticated ? ( <div> <img src={userInfo.profileImage} alt="profile_img"  width="100px" className="img-fluid rounded"/> </div> ) : (<div></div>)}
                <input value={formData.location} onChange={e=> setFormData({...formData, location:e.target.value}) } type="text" className="form-control mt-3" placeholder="Location" name="location"/>

                <button className='btn btn-outline-dark btn-block mt-3'>Submit</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    userInfo: state.user.userInfo,
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {editUser})(EditProfile);
