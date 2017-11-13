import React, { Component } from 'react';
import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import './App.css';
import SignUp from '../SignUp/signUp';

export default class App extends Component {
  render() {
    return (
      <div>
        am i working
        </div>
    //   <Router>
    //   <div>
    //   <Route path='/Signup' component={SignUp}/> 
    //   {/* <Route path='/Signup' render={()=> <SignUp/>}/>  */}
    //   </div>
    //  </ Router>
    );
  }
}



