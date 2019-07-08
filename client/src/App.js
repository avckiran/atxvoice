//Libraries
import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Local components
import Layout from './components/Layout';
import store from './store';
import Signup from './components/Forms/Signup'
import Login from './components/Forms/Login';
import Profile from './components/Users/Profile';
import Navbar from './components/Navbar';
import Post from './components/Posts/Post';
import CreatePost from './components/Posts/CreatePost';
import EditPost from './components/Posts/EditPost';
import Footer from './components/Footer';
import EditProfile from './components/Users/EditProfile';
import Events from './components/Events/Events.js'


const App = () => {
    return (
        <Provider store = {store}>
            <Router> 
            <Navbar />
                <Switch>
                    <Route exact path="/" component={Layout} />
                    <Route exact path='/signup' component={Signup}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/me' component={Profile}/>
                    <Route exact path='/post/new' component={CreatePost} />
                    <Route exact path='/post/:id' component={Post} />
                    <Route exact path='/post/edit/:id' component={EditPost} />
                    <Route exact path='/me/edit' component={EditProfile} />
                    <Route exact path="/events" component={Events} />
                </Switch>
            {/* <Footer /> */}
            </Router>
        </Provider>
    )
}

export default App
