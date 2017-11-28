import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { Image } from 'semantic-ui-react'


// var axios = require('axios');

var Nav = observer(class Nav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    var successLogin = this.props.userStore.user;
    console.log(this.props.userStore.userReturned);
    if (successLogin) { 
      console.log(this.props.userStore.user.admin)
      if(this.props.userStore.user.admin === "admin"){
        return(
          <Menu>
            <Menu.Menu position='right'>
              <Link className="item" to="/admin">Admin</Link>
              <Link className="item" to="/logout">Log Out</Link>
            </Menu.Menu>
          </Menu>
        ) 
    } else {
      
        return (
                    <Menu>
                      <Menu.Menu position='right'>
                      
                        <Link className="item" to="/logout">Log Out</Link>
                      </Menu.Menu>
                    </Menu>
                  )
    
    
    } 
    
  }else {
      return (
        <Menu>
          <Menu.Menu position='right'>
            <Link className="item" to="/login"> Login</Link>
            <Link className="item" to="/signup">Sign Up</Link>
          </Menu.Menu>
        </Menu>
      )
  }

  }
});

export default withRouter(inject('userStore')(Nav));
