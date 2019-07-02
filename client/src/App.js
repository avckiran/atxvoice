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


const App = () => {


    return (
        <Provider store = {store}>
            <Router> 
                <Switch>
                <Route exact path="/" component={Layout} />
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/me' component={Profile}/>
                </Switch>
            </Router>
        </Provider>
    )
}

export default App
