import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Container, Header} from 'semantic-ui-react'


class HomePage extends Component {

  render() {
    return (
            <Container text>
              <Header
              textAlign='center'
                as='h1'
                content='Slope Scheduler'
                //inverted
                style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '1em' }}
              />
              <Header
                textAlign='center' as='h3'
                content='Login to view shifts that need a volunteer'
                //inverted
                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
              />
              
            </Container>
          
    );
  }
}
export default withRouter(HomePage);