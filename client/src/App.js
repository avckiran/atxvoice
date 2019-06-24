import React, {Fragment} from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import BlogsArea from './components/BlogsArea';


const App = () => {


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
                        <h4>This is for Twitter</h4>
                    </div>
                </div>

               
                




            </div>



        </Fragment>
    )
}

export default App
