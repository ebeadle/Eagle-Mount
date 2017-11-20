import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import { Image } from 'semantic-ui-react'


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
        <Menu.Menu position='right'>
       <Link className="item" to="/admin">Admin</Link>
       <Link className="item" to="/calendar">Open Shifts</Link>     
       <Link className="item" to="/fancycalendar">Fancy Calendar</Link>
       <Link className="item" to="/logout">Log Out</Link>
       </Menu.Menu>
      </Menu>
    )
  } else {
    return (

      
            <Menu>
             <Menu.Menu position='right'>
             {/* <Link className="item" to="/"> 
             <Image alt="Eagle-Mount Bozeman" src="https://static1.squarespace.com/static/55e10aede4b023ac4136bb15/566634a9a976afddc7098140/5673106fc647ad862c4cb8f1/1450381490626/Eaglemount.png" width="140" height="85" />
             </Link> */}
             <Link className="item" to="/login"> Login</Link>
             <Link className="item" to="/signup">Sign Up</Link>
             </Menu.Menu>
            
            </Menu>
          )
  }
  }
});

export default withRouter(inject('userStore')(Nav));
