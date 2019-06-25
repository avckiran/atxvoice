import React, {Fragment} from 'react'
import Navbar from './Navbar';
import Header from './Header';
import BlogsArea from './BlogsArea';


const Layout = () => {
    return (
        <Fragment>
            <Navbar />
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-9 p-5">
                        <BlogsArea />
                    </div>
                    <div className="col-md-3 border-left p-3 d-none d-md-block">
                        <h4>Twitter</h4>
                    </div>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Layout
