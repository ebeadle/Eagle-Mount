import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react'
import {inject, observer} from 'mobx-react';
// var axios = require('axios');

var Login = observer(class Login extends Component {
  constructor(){
    super()

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state={
      email: "",
      password: ""
    }
  }

  handleEmail(event){
    this.setState({email: event.target.value})
  }
  handlePassword(event){
    this.setState({password: event.target.value})
  }

  handleClick(){
  return new Promise ((resolve, reject) => {
    console.log("hello?")
    this.props.userStore.loginUser({
      email: this.state.email, 
      password: this.state.password,
      
    }).then((userStore)=>{
        console.log(userStore);
        if (userStore.success){
          console.log('!!!!')
        this.props.history.push('/calendar'); 
        } 
        resolve(userStore) 

    }).catch((e)=> {
      console.log(e)
    });
  });
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
           
            {' '}Login
          </Header>
          <Form size='large'>
            <Segment stacked>
            
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                onChange={this.handleEmail}
                value={this.state.email}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={this.handlePassword}
                value={this.state.password}
              />
  
              <Button onClick={this.handleClick} color='blue' fluid size='large'>Login</Button>
            </Segment>
          </Form>
         
        </Grid.Column>
      </Grid>
      
    </div>
    );
  }
})

export default withRouter(inject('userStore')(Login));