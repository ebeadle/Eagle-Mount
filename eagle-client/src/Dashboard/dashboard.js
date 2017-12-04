import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

var Dashboard = observer(class Dashboard extends Component {
  constructor() {
    super();
   }

   componentDidMount() {
    this.props.userStore.verifyUser() //checks user session so that page can refresh
  }

   render () {
    if (this.props.userStore.user) {
    return (
<div>
      <Grid>
      <Grid.Column computer={8}>
        <h1>Dashboard</h1>
        <h2>Welcome, {this.props.userStore.user.firstName} {this.props.userStore.user.lastName} </h2>
        <p><strong>Settings: </strong><br/>
        Email: {this.props.userStore.user.email}  
        </p>
      </Grid.Column>
      <Grid.Column computer={8} mobile={16} tablet={8}>
      </Grid.Column>
    </Grid> 
  </div>

 
    ) 
  } else {
    return (
    "Please Login"
    )
  }

  }
});
export default inject("userStore")(Dashboard);