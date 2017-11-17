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
import ShiftStore from '../Stores/ShiftStore';
import Calendar from '../Calendar/calendar';
import Admin from '../Admin/admin';
import Logout from '../Logout/logout';
<<<<<<< HEAD
import HomePage from '../Home/Home';
=======
import Footer from '../Footer/Footer';
import FancyCalendar from '../FancyCalendar/fancyCalendar';

>>>>>>> 319987a1c9697970321ef3c7c18cd130d9d75a45

export default class App extends React.Component {
  render() {
    return (
<<<<<<< HEAD
      <Provider userStore={new UserStore()}>
        <div className="Home-intro">
=======
      <Provider userStore={new UserStore()} shiftStore={new ShiftStore()}>
        <div>
>>>>>>> 319987a1c9697970321ef3c7c18cd130d9d75a45
        <Router>
          <div>
            <Nav />
              <Route path='/Admin' render={()=> <Admin /> }/>
              <Route path='/Signup' render={()=> <SignUp />}/> 
              <Route path='/Login' render={()=> <Login />}/> 
              <Route path='/Logout' render={()=> <Logout />}/> 
              <Route path='/Calendar' render={()=> <Calendar />}/> 
              <Route path='/FancyCalendar' render={()=> <FancyCalendar />}/> 
              <Footer />
          </div>
        </ Router>
        <HomePage />
        </div>
        
     </Provider>
    );
  }
}