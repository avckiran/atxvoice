import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getEvents} from '../../actions/events';
import Spinner from '../Spinner';
import Moment from 'react-moment';



const Events = ({events, getEvents}) => {

    useEffect(()=>{
        getEvents();
    },[getEvents])

    const imgStyle={
        "width":"100%",
        // "width":"300px",
        "height":"200px",
        "objectFit":"cover"
    }

    const tzText = timezone => {
        switch(timezone){
            case 'America/Chicago' : return 'CT'
            case 'America/Los_Angeles' : return 'PT'
            case 'America/New_York' : return 'ET'
            case 'America/Denver' : return 'MT'
            case 'America/Phoenix' : return 'MT'
            default : return 'UNK'
        }
    }


    const eventCard = (title, img, desc, link, time, timezone, location) => (
        <div>
        {/* <div>Event Card - {title}</div> */}
        <div className="card text-center mb-4">
        <img className="card-img-top img-fluid" style={imgStyle} src={img} alt="" />
        <div className="card-body">
            <h4 className="card-title mb-3 pb-2 border-bottom">{title}</h4>
            <div className="mb-2 text-muted text-left border-bottom">
            <i className="far fa-calendar-alt mr-2"></i>
            <Moment format="MMM DD, YY - h:mm A">{time}</Moment>{` `} <span>{tzText(timezone)}</span>
                <br/>
                <p><i className="fas fa-map-marker-alt mr-2"></i>{location}</p>
            </div>

            <p className="card-text text-left">{desc ? desc : ' '}</p>
        </div>
    
        <div className="card-footer">
            <a href={link} target="_blank" rel="noopener noreferrer" >More Info</a>
        </div>
        </div>
        </div>
    )



    return (
        <div className="container mt-5">
            <h4 className="display-4 mb-4 text-center">Upcoming Events</h4>
            {events.loading ? <Spinner /> : <div>
                <div className="card-columns mt-5">

                {events.events.filter(event => event.venue.address.address_1).map(event => (
                    <div key={event.id}> 
                        {eventCard(
                            event.name.text, 
                            event.logo ? event.logo.url : ' ',
                            // event.description.text,
                            event.summary,
                            event.url ? event.url : ' ',
                            event.start.local,
                            event.start.timezone,
                            event.venue.address.address_1
                            )}
                    </div>
                ))}

                </div>
            </div>}

        </div>
    )
}

const mapStateToProps = state => ({
    events: state.events
})

export default connect(mapStateToProps, {getEvents})(Events)
