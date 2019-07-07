import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {formAlert, registerUser, fileUpload} from '../../actions/user';
import Alert from './Alert';

const Signup = ({formAlert, registerUser, alerts, isAuthenticated, fileUpload, filePath}) => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        email:'',
        password:'',
        password2:'',
        bio:'',
        interests:'',
        picture:'',
        location:'',
        submitBtn:false
    })

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File : limit 3mb')

    
    const {password, password2} = formData;

    const onChange = e =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onFileChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    
    // console.log("file", file);
   
    const uploadPicture = () => {
        const uploadFileName = Date.now()+'_'+fileName;
        const uploadFilePath=`/uploads/${uploadFileName}`;
        setFormData({...formData, picture: uploadFilePath});
        fileUpload(file);
    }
   
    
    const formSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            formAlert("Passwords didn't match"); 
            window.scrollTo(10,30);
            return null;
        }
        if(file){
            if(file.size > 3000000){
                formAlert('File is too big, please upload images less than 3 MB.');
                window.scrollTo(10,30);
                return null;
            }
            // fileUpload(file);
            // console.log(formData);
            registerUser(formData);
        }else{
            registerUser(formData);
        }

    }


    
    if(isAuthenticated){
       return <Redirect to="/" />
    }

    const onRulesAgree = e => {
        e.target.checked ? setFormData({...formData, submitBtn:true}) 
        : setFormData({...formData, submitBtn:false})
    }

    return (
        <Fragment>
        {/* <Navbar /> */}
        <div className="container">
            <div className="row"> 
                <div className="col-md-8 p-2">
                    <div className="card p-4">
                        <div className="card-body">
                            <h3 className="text-center">Please fill out the form</h3>
                            <hr/>
                            {alerts.map(alert => (<Alert key={alert.id} alert={alert}/>))}
                          
                            

                            <form onSubmit={e=> formSubmit(e)}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input onChange={e=> onChange(e)} type="text" className="form-control mt-3" placeholder="First Name*" name="firstName" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input onChange={e=> onChange(e)}  type="text" className="form-control mt-3" placeholder="Last Name" name="lastName"  />
                                    </div>
                                </div>
                                <input onChange={e=> onChange(e)}  type="email" className="form-control mt-3" placeholder="Email address*" name="email" required />
                                <input onChange={e=> onChange(e)}  type="password" className="form-control mt-3" placeholder="Password*" name="password" minLength="6" maxLength="20" required/>
                                    <small className="form-text text-muted ml-1 mt-0">must be at least 6 characters</small>
                                <input onChange={e=> onChange(e)}  type="password" className="form-control mt-3" placeholder="Confirm Password*" name="password2" minLength="6" maxLength="20" required/>
                                <textarea onChange={e=> onChange(e)}  className="form-control mt-3" placeholder="Tell us a few lines about you!" name="bio"></textarea>
                                <input onChange={e=> onChange(e)}  type="text" className="form-control mt-3" placeholder="Your interests" name="interests" />
                                    <small className="form-text text-muted ml-1 mt-0">separate by comma</small>
                                <div className="d-flex custom-file mt-3 align-center">
                                    <div className="col-md-9">
                                        <input onChange={e=> onFileChange(e)} type="file" className="custom-file-input" accept="image/png, image/jpeg"/>
                                        <label htmlFor="image" className="custom-file-label">{fileName}</label>
                                        {/* <small className="form-text text-muted ml-1 mt-0 mb-5">max size 3MB</small> */}
                                    </div>
                                    <div className="col-md-3">
                                        <button onClick={()=> uploadPicture()} className="d-inline btn btn-dark">Upload</button>
                                    </div>
                                </div>
                                {filePath? 
                                    <img src={filePath} alt="profile_img"  width="100px" className="img-fluid rounded"/>
                                    : <div></div>}
                                <input onChange={e=> onChange(e)}  type="text" className="form-control mt-3" placeholder="Location" name="location"/>
                                
                                <label htmlFor="accept" className="mt-3 ml-4">
                                    <input type="checkbox" 
                                        className="form-check-input"
                                        onChange={e => onRulesAgree(e)}/> I agree to the community rules
                                </label>
                                <button className='btn btn-outline-dark btn-block mt-3' disabled={!formData.submitBtn}>Submit</button>
                            </form>
                            <div className="text-center mt-3">
                            Already have an account? <Link to="/login" > Sign-in </Link>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="col-md-4 p-2">
                    <div className="card">
                        <div className="card-header">
                            <h5>Community Rules</h5>
                        </div>
                        <div className="card-body">
                            <ol>
                                <li>Please good to one another</li>
                                <li>Follow Rule#1 - seriously</li>
                                <li>Leave politics to the politics category, don't bombard comments section</li>
                                <li>Don't sell "your" products to the community</li>
                                <li>The blog post shouldn't contain just link(s)</li>
                                <li>These rules subjected to change at our descretion to promote the health of the community</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
     
        </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    alerts: state.alerts,
    isAuthenticated: state.user.isAuthenticated,
    filePath: state.user.uploadedFile.filePath
})

export default connect(mapStateToProps, {formAlert, registerUser, fileUpload})(Signup);
