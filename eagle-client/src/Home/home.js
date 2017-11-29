import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
//import { Button } from 'reactstrap';
//import 'bootstrap/dist/css/bootstrap.css';
//import './home.css'
class HomePage extends Component {

  render() {
    return (
            <Container text>
              <Header
                as='h1'
                content='Welcome to the Eagle Mount Volunteer Calendar'
                //inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
              />
              <Header
                as='h3'
                content='Login here to view shifts that need a volunteer'
                //inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />
              <Button primary size='huge' >Login
                <Link to='/login'></Link>
                <Icon name='right arrow' />
              </Button>
            </Container>
          
    );
  }
}
export default withRouter(HomePage);