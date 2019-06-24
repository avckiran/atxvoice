import React, {useEffect, useState} from 'react'
import logo from '../assets/atx-voice-full-logo.png';
import Weather from './Weather';
import axios from 'axios'



const Navbar = () => {

    const [weather, setWeather] = useState({});


    useEffect(()=>{
            window.navigator.geolocation.getCurrentPosition(
                async position => {
                    const location = position.coords.latitude+','+position.coords.longitude;
                    // console.log(location);
                    const res = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/baf0a73e8caa45d28c7ba1c7c9edb1d3/${location}`);
                    setWeather(res.data.currently)
                },
                err => console.log(err)
                )
    },[])

    return (
        <div>
            <nav className="navbar navbar-expand-sm mr-auto">
                <div className="container">
                    <a href="home" className="navbar-brand"><img src={logo} alt="" className="img-fluid" style={{height:'20px', width:'auto'}}/></a>

                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav">
                                <i className="fas fa-bars"></i>
                    </button>
                    <div id="navbarNav" className="collapse navbar-collapse">
                        <div className="mr-auto">
                            <Weather weather={weather}/>
                        </div>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-link text-center">Sign in</li>
                            <li className="nav-link btn btn-outline-dark ml-3">Get Started</li>
                        </ul>
                    </div>

                </div>
            </nav>
            
        </div>
    )
}

export default Navbar
