import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Container, Header, Icon} from 'semantic-ui-react';
import './home.css';


class HomePage extends Component {

  render() {
    return (
      <div >
        <Container text >
          
          <Header
            textAlign='center'
            as='h1'
            content='Slope Scheduler'
            //inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginTop: '1em', marginBottom: 0 }}
          />
          <Header
            textAlign='center' as='h3'
            content='Login to view shifts that need a volunteer'
            //inverted
            style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: 0, marginBottom: '2em' }}
          />

        </Container>
      </div>
    );
  }
}
export default withRouter(HomePage);