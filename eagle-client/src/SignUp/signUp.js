import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {inject, observer} from 'mobx-react';
import "./signUp.css"
var axios = require('axios');

var SignUp = observer(class SignUp extends Component {
constructor(props){
  super(props)
  this.state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    message: "",
    admin: ""
  }
  this.handleClick = this.handleClick.bind(this);
  this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
  this.handleLastNameChange = this.handleLastNameChange.bind(this);
  this.handlePasswordChange = this.handlePasswordChange.bind(this);
  this.handleEmailChange = this.handleEmailChange.bind(this);
 
}

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value});
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value});
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value});
  }
 

  handleClick(){
    this.props.userStore.signUpUser(
      {firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      admin: ""

      }
    ).then((res)=> {
      if(res.data.success){
        console.log("added user");
        this.props.history.push('/login');
      } else {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          admin: '',
          message: this.props.userStore.user.message});
      }
    }).catch((e)=> {
      console.log(e)
    })
  }

  render() {
    
    return (
      <div className='login-form'>
      
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            
            {' '}Sign Up
          </Header>

          <Form size='large'>
          <p className="message"> {this.state.message}   </p>  
            <Segment stacked>
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='First Name'
                type='text'
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              />

            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Last Name'
                type='text'
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                value={this.state.password}
                onChange={this.handlePasswordChange}

              />

              

             
  
              <Button color='blue' fluid size='large' onClick={this.handleClick} >Sign Up</Button>
            </Segment>
          

          </Form>
         
        </Grid.Column>
      </Grid>
    </div>
    );
  }
})

export default withRouter(inject('userStore')(SignUp));