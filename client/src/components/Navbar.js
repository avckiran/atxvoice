//Libraries
import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//Assets
import logo from '../assets/atx-voice-full-logo.png';
//Local components
import Weather from './Weather';
import {getCurrentWeather, getCity} from '../actions/weather';



const Navbar = ({weather, location, getCurrentWeather, getCity}) => {

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
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-link text-center">Sign in</li>
                            <li> <Link to="/signup" className="nav-link btn btn-outline-dark ml-3">Get Started</Link></li>
                        </ul>
                    </div>

                </div>
            </nav>
            
        </div>
    )
}

const mapStateToProps = state => ({
    weather:state.weather,
    location: state.weather.location
})

export default connect(mapStateToProps, {getCurrentWeather, getCity})(Navbar);
