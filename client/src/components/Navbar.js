//Libraries
import React, {useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
//Assets
import logo from '../assets/atx-voice-full-logo.png';
//Local components
import Weather from './Weather';
import {getCurrentWeather, getCity} from '../actions/weather';
import {logout, loadUser} from '../actions/user';



const Navbar = ({weather, location, getCurrentWeather, getCity, isAuthenticated, logout, loadUser, loading, userInfo}) => {

    useEffect(()=>{
            window.navigator.geolocation.getCurrentPosition(
                position => {
                    const {latitude, longitude} = position.coords;
                    getCurrentWeather(latitude, longitude);
                    getCity(latitude, longitude);
                },
                err => console.log(err)
            );
            if(localStorage.getItem('token')) loadUser();
    },[getCurrentWeather, getCity, loadUser])

    // console.log(isAuthenticated);


    const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li><Link to="/login" className="nav-link text-dark text-center">Sign in</Link></li>
            <li> <Link to="/signup" className="nav-link btn btn-outline-dark ml-3">Get Started</Link></li>
        </ul>
    )
    


    const authLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown mr-3 align-items-center">
            <a href="#" className="d-inline nav-link dropdown-toggle" data-toggle="dropdown">
                { (!loading) ? <img className="img-fluid w-25" src={userInfo.profileImage} /> : <i className="fas fa-user" />}
                        { !loading ? userInfo.firstName : ''}
   
            </a>
            <div className="dropdown-menu">
                <Link to="/me" className="dropdown-item">
                    <i className="fas fa-user-circle"></i> Profile
                </Link>
                
                <a href="#" onClick={logout} className="dropdown-item">
                    <i className="fas fa-cog"></i> Logout
                </a>
                
            </div>
        </li>
    </ul>
    );

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
                            {isAuthenticated && !loading ? authLinks: guestLinks}
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
    isAuthenticated: state.user.isAuthenticated,
    userInfo: state.user.userInfo,
    loading: state.user.loading
})

export default connect(mapStateToProps, {getCurrentWeather, getCity, logout, loadUser})(Navbar);
