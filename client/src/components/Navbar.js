//Libraries
import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//Assets
import logo from '../assets/atx-voice-full-logo.png';
//Local components
import Weather from './Weather';
import {getCurrentWeather, getCity} from '../actions/weather';
import {logout} from '../actions/user';



const Navbar = ({weather, location, getCurrentWeather, getCity, isAuthenticated, logout}) => {

    useEffect(()=>{
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    const {latitude, longitude} = position.coords;
                    getCurrentWeather(latitude, longitude);
                    getCity(latitude, longitude);
                },
                err => console.log(err)
                )
    },[getCurrentWeather, getCity])

    // console.log(isAuthenticated);


    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li><Link to="/login" className="nav-link text-dark text-center">Sign in</Link></li>
            <li> <Link to="/signup" className="nav-link btn btn-outline-dark ml-3">Get Started</Link></li>
        </ul>
    )

    const authLinks =(
        <ul className="navbar-nav ml-auto">
            <li className="nav-link text-center">Profile</li>
            <li> <a href="#!" onClick={logout} className="nav-link ml-3">Logout</a></li>
        </ul>
    )

    return (
        <div>
            <nav className="navbar navbar-expand-sm mr-auto">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <div>
                            <Link to="/" className="navbar-brand"><img src={logo} alt="" className="img-fluid" style={{height:'20px', width:'auto'}}/></Link>
                        </div>
                        <div className="pt-1">
                            <Weather weather={weather.weather} location={location}/>
                        </div>
                    </div>

                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                                <i className="fas fa-bars"></i>
                    </button>
                   
                    <div id="navbarNav" className="collapse navbar-collapse">
                        <Fragment>
                            {isAuthenticated? authLinks: guestLinks}
                        </Fragment>
                    </div>

                </div>
            </nav>
            
        </div>
    )
}

const mapStateToProps = state => ({
    weather:state.weather,
    location: state.weather.location,
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {getCurrentWeather, getCity, logout})(Navbar);
