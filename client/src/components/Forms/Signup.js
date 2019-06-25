import React, {Fragment, useState} from 'react'
import Navbar from '../Navbar'

const Signup = () => {

    const [formData, setFormData] = useState({submitBtn: 'btn btn-outline-dark btn-block mt-3 disabled'})
    
    const onChecked = e => {
        e.target.checked ? setFormData({...formData, submitBtn:'btn btn-outline-dark btn-block mt-3'}) : setFormData({...formData, rulesBtn:'btn btn-outline-dark btn-block mt-3 disabled'})
    }
    // console.log(btnClass);
    return (
        <>
        <Navbar />
        <div className="container">
            <div className="row">
                <div className="col-md-8 p-2">
                    <div className="card p-4">
                        <div className="card-body">
                            <h3 className="text-center">Please fill out the form</h3>
                            <hr/>
                            <form action="">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="First Name*" required />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Last Name" />
                                    </div>
                                </div>
                                <input type="email" className="form-control mt-3" placeholder="Email address*" required/>
                                <input type="password" className="form-control mt-3" placeholder="Password*" required/>
                                    <small className="form-text text-muted ml-1 mt-0">must be at least 6 characters</small>
                                <input type="password" className="form-control mt-3" placeholder="Confirm Password*" required/>
                                <textarea className="form-control mt-3" placeholder="Tell us a few lines about you!"></textarea>
                                <input type="text" className="form-control mt-3" placeholder="Your interests"/>
                                    <small className="form-text text-muted ml-1 mt-0">separate by comma</small>
                                <div className="custom-file mt-3">
                                    <input type="file" className="custom-file-input"/>
                                    <label htmlFor="image" class="custom-file-label">Choose a profile picture</label>
                                </div>
                                    <small className="form-text text-muted ml-1 mt-0">max size 3MB</small>
                                <input type="text" className="form-control mt-3" placeholder="Location"/>
                                
                                <label htmlFor="accept" className="mt-3 ml-4">
                                    <input type="checkbox" className="form-check-input"/> I agree to the community rules
                                </label>
                                <button className={formData.submitBtn}>Submit</button>
                            </form>
                        


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
        </>
    )
}

export default Signup
