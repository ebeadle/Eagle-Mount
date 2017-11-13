import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
// var axios = require('axios');

export default class SignUp extends Component {
  render() {
    
    return (
      <div className='login-form'>
      <p> Eagle Mount considers Expert to be Bi-Ski certified. Intermediate blahhhh and Beginner will hang out with kids.</p>
    
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
            <Image src='/logo.png' />
            {' '}Sign Up
          </Header>
          <Form size='large'>
            <Segment stacked>
            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='First Name'
                type='text'
              />

            <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Last Name'
                type='text'
              />
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

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
              />

               <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Skill Level'
                type='text'
              />

              
  
              <Button color='blue' fluid size='large'>Sign Up</Button>
            </Segment>
          </Form>
         
        </Grid.Column>
      </Grid>
    </div>
    );
  }
}