import React from 'react'


const Weather = ({weather, location}) => {
    


    let icon = weather? weather.icon : 'loading';
    switch(icon){
        case 'clear-day': {icon='fas fa-sun'; break;}
        case 'clear-night': {icon='far fa-sun'; break;}
        case 'rain': {icon = 'fas fa-cloud-showers-heavy'; break;}
        case 'snow': {icon = 'fas fa-snowflake'; break;}
        case 'sleet': {icon = 'fas fa-cloud-meatball'; break;}
        case 'wind': {icon='fas fa-wind'; break;}
        case 'fog': {icon='fas fa-smog'; break;}
        case 'cloudy': {icon='fas fa-cloud'; break;}
        case 'partly-cloudy-day': {icon='fas fa-cloud-sun'; break;}
        case 'partly-cloudy-night': {icon='fas fa-cloud-moon'; break;}
        case 'hail' : {icon='fas fa-cloud-meatball'; break;}
        case 'thunderstorm': {icon='fas fa-bolt'; break;}
        default: {icon='fas fa-cloud-sun'; break;}
    }
    
    const loc_text = location ? (<span> <small>{location.city}, {location.state}</small></span>):(<span></span>)

    return (
        weather? (<div>
            <i className={icon}></i>
            <p className="d-inline"> {Math.ceil(weather.temperature?weather.temperature:0)}<sup>o</sup>F </p>
            {loc_text}
        </div>) : (<div></div>)
    
    )
}

export default Weather
