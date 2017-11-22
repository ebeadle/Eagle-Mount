import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './home.css'
class HomePage extends Component {

  render() {
    return (
      <div className="Home" className="background">
        <header className="Home-header">
        </header>
        <h1 className="Home-title">Welcome to Eagle Mount</h1>

      </div>
    );
  }
}
export default withRouter(HomePage);