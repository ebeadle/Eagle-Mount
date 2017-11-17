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
import Calendar from '../Calendar/calendar';
import Admin from '../Admin/admin';
import Logout from '../Logout/logout';
import HomePage from '../Home/Home';

export default class App extends React.Component {
  render() {
    return (
      <Provider userStore={new UserStore()}>
        <div className="Home-intro">
        <Router>
          <div>
            <Nav />
              <Route path='/Admin' render={()=> <Admin /> }/>
              <Route path='/Signup' render={()=> <SignUp />}/> 
              <Route path='/Login' render={()=> <Login />}/> 
              <Route path='/Logout' render={()=> <Logout />}/> 
              <Route path='/Calendar' render={()=> <Calendar />}/> 
          </div>
        </ Router>
        <HomePage />
        </div>
        
     </Provider>
    );
  }
}