import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Container } from 'semantic-ui-react'
// var axios = require('axios');

export default class SignUp extends Component {
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
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
  
              <Button color='blue' fluid size='large'>Login</Button>
            </Segment>
          </Form>
         
        </Grid.Column>
      </Grid>
      
    </div>
    );
  }
}