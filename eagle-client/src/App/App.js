import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import SignUp from '../SignUp/signUp';
import {Provider} from 'mobx-react';
import Login from '../Login/login';
import Nav from '../NavBar/navBar';
import UserStore from '../Stores/UserStore';

export default class App extends Component {
  render() {
    return (
      <Provider userStore={new UserStore()}>
        <div>
        <Router>
          <div>
            <Nav />
              <Route path='/Signup' render={()=> <SignUp />}/> 
              <Route path='/Login' render={()=> <Login />}/> 
          </div>
        </ Router>
        </div>
     </Provider>
    );
  }
}



