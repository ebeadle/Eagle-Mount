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

export default class App extends Component {
  render() {
    return (
      <Provider userStore={new UserStore()}>
        <div>
        <Router>
          <div>
            <Nav />
              <Route path='/Admin' render={()=> <Admin />}/>
              <Route path='/Signup' render={()=> <SignUp />}/> 
              <Route path='/Login' render={()=> <Login />}/> 
              <Route path='/Calendar' render={()=> <Calendar />}/> 
          </div>
        </ Router>
        </div>
     </Provider>
    );
  }
}



