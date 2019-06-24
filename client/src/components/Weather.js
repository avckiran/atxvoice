import React from 'react'


const Weather = ({weather}) => {

    let icon;
    switch(weather.icon){
        case 'clear-day': icon='fas fa-sun'
        case 'clear-night': icon='far fa-sun'
        case 'rain': icon = 'fas fa-cloud-showers-heavy'
        case 'snow': icon = 'fas fa-snowflake'
        case 'sleet': icon = 'fas fa-cloud-meatball'
        case 'wind': icon='fas fa-wind'
        case 'fog': icon='fas fa-smog'
        case 'cloudy': icon='fas fa-cloud'
        case 'partly-cloudy-day': icon='fas fa-cloud-sun'
        case 'partly-cloudy-night': icon='fas fa-cloud-moon'
        case 'hail' : icon='fas fa-cloud-meatball'
        case 'thunderstorm': icon='fas fa-bolt'
        default: icon='fas fa-cloud-sun'
    }
    console.log(weather);
    return (
        weather? (<div>
            <i className={icon}></i>
            <p className="d-inline"> {Math.ceil(weather.temperature?weather.temperature:0)}<sup>o</sup>F </p>
            <span> <small>Austin,TX</small></span>
        </div>) : (<div>loading</div>)
    
    )
}

export default Weather
