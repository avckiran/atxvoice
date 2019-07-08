import React, {useEffect} from 'react';
import {getEvents} from '../../actions/events';
import {connect} from 'react-redux';
import {Carousel} from 'react-bootstrap';
import Spinner from '../Spinner';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';


const EventsCarousel = ({events, getEvents}) => {

    useEffect(()=> {
        if(events.loading){
            getEvents();
        }
    },[getEvents, events.loading])

    const imgStyle = {
        "width":"100%",
        // "width":"300px",
        "height":"400px",
        "objectFit":"cover",
        "opacity": "0.5"
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

    return (
       <header id="head-intro" className="container mt-4">
           <div>
              {events.loading ? <Spinner /> : <Carousel>
                    {events.events.filter(event => event.venue.address.address_1).slice(0,5).map(event => (
                          <Carousel.Item key={event.id} className="bg-dark">
                            <img 
                                className="d-block w-100"
                                src={event.logo.original.url? event.logo.original.url : ' '}
                                alt="title"
                                style={imgStyle}
                            />
                            
                            <Carousel.Caption className="text-white px-4" style={{"background":"rgba(0,0,0, 0.5"}} >
                                <Link to="/events" className="text-white"><h3 className="mb-3">{event.name.text}</h3></Link>
                                <div className="mb-2 d-flex justify-content-between">
                                    <div>
                                    <i className="far fa-calendar-alt mr-2"></i><Moment format="MMM DD, YY - h:mm A">{event.start.local}</Moment>{` `}<span>{tzText(event.start.timezone)}</span>
                                    </div>
                                    <div><i className="fas fa-map-marker-alt mr-2"></i>{event.venue.address.address_1}</div>
                                </div>
                            </Carousel.Caption>
                            
                        </Carousel.Item>
                        ))
                    }
              </Carousel>
                }
           </div>
       </header>
    )
}

const mapStateToProps = state => ({
    events: state.events
})

export default connect(mapStateToProps, {getEvents}) (EventsCarousel)
