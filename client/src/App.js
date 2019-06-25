import React, {Fragment} from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import BlogsArea from './components/BlogsArea';
import store from './store';
import {Provider} from 'react-redux';


const App = () => {


    return (
        <Provider store = {store}>
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
        </Provider>
    )
}

export default App
