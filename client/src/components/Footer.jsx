import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/atx-voice-full-logo.png';

const Footer = () => {
    return (
            <footer className="container fixed-bottom p-4 mb-4 border-top" style={{'height':'100px'}}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                    <Link to="/" className="navbar-brand"><img src={logo} alt="" className="img-fluid" style={{height:'20px', width:'auto'}}/></Link>
                    </div>
                    <div>
                        <small className="text-muted">
                            11700 Metric Blvd <br/>
                            Apt 211 <br/>
                            Austin, TX - 78758 <br/>
                            Email: info@atxvoice.com
                        </small>
                    </div>
                </div>
            
            </footer>
    )
}

export default Footer
