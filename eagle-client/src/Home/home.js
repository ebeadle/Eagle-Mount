import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
//import './home.css'
class HomePage extends Component {

  render() {
    return (
      <div class="jumbotron text-center">
        <h1 class="display-3">Welcome to the Eagle Mount Volunteer Calendar</h1>
        <p class="lead">Login here to view shifts that need a volunteer</p>
        <a href="/login" class="btn btn-dark btn-lg">Login</a>
      </div>
    );
  }
}
export default withRouter(HomePage);