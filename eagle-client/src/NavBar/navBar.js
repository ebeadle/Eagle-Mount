import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';


// var axios = require('axios');

var Nav = observer(class Nav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    var successLogin = this.props.userStore.user;
    console.log(successLogin);
    if(successLogin){    
      return (

      <Menu>
       <Link className="item" to="/admin">Admin</Link>
       <Link className="item" to="/calendar">Open Shifts</Link>
       <Link className="item" to="/logout">Log Out</Link>
      </Menu>
    )
  } else {
    return (
      
            <Menu>
             <Link className="item" to="/login"> Login</Link>
             <Link className="item" to="/signup">Sign Up</Link>
            </Menu>
          )
  }
  }
});

export default withRouter(inject('userStore')(Nav));
