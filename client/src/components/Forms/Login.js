import React, {Fragment, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar'
import {login} from '../../actions/user';
import Alert from './Alert';

const Login = ({isAuthenticated, alerts, login}) => {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

    const formSubmit = e => {
        e.preventDefault();
        login(formData);
    }

    if(isAuthenticated){
        return <Redirect to="/" />
    }

    return (
        <Fragment>
            <Navbar />
            <div className="container mt-2">
                <div className="d-flex justify-content-center ">
                    <div className="w-auto p-5 mt-5">
                        <h4 className="text-center m-3">Sign in</h4>
                        {alerts.map(alert => (<Alert key={alert.id} alert={alert}/>))}
                        <form onSubmit = {e=> formSubmit(e)}>
                            <input type="email" className="form-control mt-3" name="email" onChange={e=> onChange(e)} placeholder="Email"/>
                            <input type="password" className="form-control mt-3" name="password" onChange={e=> onChange(e)} placeholder="Password"/>
                            <button className="btn btn-dark btn-block mt-3">Login</button>
                        </form>
                        <div className="mt-4">Don't have an account? <Link to="/signup">Register</Link></div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    alerts: state.alerts
})

export default connect(mapStateToProps, {login})(Login)
