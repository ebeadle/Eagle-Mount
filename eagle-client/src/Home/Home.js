import React, { Component } from 'react';

import './Home.css'
class HomePage extends Component {

  render() {
    return (
      <div className="Home"  className="background">
        <header className="Home-header">
        </header> 
          <h1 className="Home-title">Welcome to React</h1>
        <p>
          To get started, edit <code>src/Home.js</code>
        </p>
      </div>
    );
  }
}
export default HomePage;