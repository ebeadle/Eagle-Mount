import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Container, Header} from 'semantic-ui-react'


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
              
            </Container>
          
    );
  }
}
export default withRouter(HomePage);