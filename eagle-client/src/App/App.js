import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';
import './App.css';
import SignUp from '../SignUp/signUp';
import { Provider } from 'mobx-react';
import Login from '../Login/login';
import Nav from '../NavBar/navBar';
import UserStore from '../Stores/UserStore';
import ShiftStore from '../Stores/ShiftStore';
import Calendar from '../Calendar/calendar';
import Admin from '../Admin/admin';
import Logout from '../Logout/logout';
import Footer from '../Footer/footer';
import FancyCalendar from '../FancyCalendar/fancyCalendar';
import HomePage from '../Home/home';
import Dashboard from '../Dashboard/dashboard'
import NotFound from './NotFound.jsx';



export default class App extends Component {
  render() {
    return (
      <Provider userStore={new UserStore()} shiftStore={new ShiftStore()}>
        <div>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Nav />
              <div style={{ flex: 1}}>
              <Switch>
                <Route exact path='/' component={HomePage} /> 
                <Route path='/Admin' render={() => <Admin />} />
                <Route path='/Signup' render={() => <SignUp />} />
                <Route path='/Login' render={() => <Login />} />
                <Route path='/Logout' render={() => <Logout />} />
                <Route path='/Calendar' render={() => <Calendar />} />
                <Route path='/FancyCalendar' render={() => <FancyCalendar />} />
                <Route path='/Dashboard' render={() => <Dashboard />} />
                <Route exact path='/' render={() => <HomePage />} />
                <Route component={NotFound} />
              </Switch>
              </div>
              <Footer />
            </div>
          </ Router>
        </div>
      </Provider>
    );
  }
}