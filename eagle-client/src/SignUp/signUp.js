import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import ReactPasswordStrength from 'react-password-strength';
import "./signUp.css";
var axios = require('axios');

var SignUp = observer(class SignUp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      confirmPassword: "",
      password: "",
      message: "",
      admin: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.changeCallback = this.changeCallback.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);

  }

  handleFirstNameChange(event) {
    this.setState({ firstName: event.target.value });
  }
  handleLastNameChange(event) {
    this.setState({ lastName: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ confirmPassword: event.target.value });
  }
  changeCallback(event) {
    this.setState({ password: event.password });
    this.setState({ score: event.score });
  }

  handleClick() {
    //console.log("The test worked:" + this.state.score);
    if (this.state.password === this.state.confirmPassword && (this.state.score >= 1)) {
      this.props.userStore.signUpUser(
        {

          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword,
          admin: ""

        }
      ).then((res) => {
        if (res.data.success) {
          this.props.history.push('/fancyCalendar');
        } else {
          this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            admin: '',
            message: this.props.userStore.user.message
          });
        }
      }).catch((e) => {

      })
    } else {

      if ((this.state.password !== this.state.confirmPassword) && (this.state.score < 1)) {
        this.setState({
          message: "Passwords Do Not Match & Not Strong Enough!"
        })
        console.log("Passwords Do Not Match & Not Strong Enough!")
      }
      else if (this.state.password !== this.state.confirmPassword) {
        this.setState({
          message: "Passwords Do Not Match!"
        })
        console.log("passwords do not match")
      }
      else if (this.state.score < 1) {
        this.setState({
          message: "Not Strong Enough!"
        })
        console.log("Not Strong Enough!")
      }

    }
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
            <Header as='h2' className='header' textAlign='center'>

              {' '}Sign Up
          </Header>

            <Form size='large'>
              <p className="message"> {this.state.message}   </p>
              <Segment stacked>
                <Form.Input
                  fluid
                  style={{height: '47.41px', fontSize: '18px'}}                  
                  placeholder='First Name'
                  type='text'
                  value={this.state.firstName}
                  onChange={this.handleFirstNameChange}
                />

                <Form.Input
                  fluid
                  style={{height: '47.41px', fontSize: '18px'}}                  
                  placeholder='Last Name'
                  type='text'
                  value={this.state.lastName}
                  onChange={this.handleLastNameChange}
                />

                <Form.Input
                  style={{height: '47.41px', fontSize: '18px'}}
                  fluid
                  placeholder='E-mail address'
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />

            
                  <ReactPasswordStrength
                    minLength={5}
                    minScore={1}
                    scoreWords={['weak', 'okay', 'good', 'strong', 'Kyle Approved']}
                    inputProps={{ placeholder: 'Password', autoComplete: "off", className: "form-control" }}
                    placeholder='Confirm Password'
                    type='password'
                    value={this.state.password}
                    changeCallback={this.changeCallback}
                    style={{border: 'none'}}
                    
                  />
                  <div className='formPadder'>
                  </div>
                

                <Form.Input
                  fluid
                  style={{height: '47.41px', fontSize: '18px'}}                  
                  placeholder='Password'
                  type='password'
                  value={this.state.confirmPassword}
                  onChange={this.handlePasswordChange}
                />

                <Button fluid size='large' onClick={this.handleClick} >Sign Up</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
})

export default withRouter(inject('userStore')(SignUp));