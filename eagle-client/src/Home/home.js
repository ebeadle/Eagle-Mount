import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Container, Header, Icon, Grid, Segment, Image} from 'semantic-ui-react';
import './home.css';


class HomePage extends Component {

  render() {
    return (
      <div >
        <Container text className="textContainer" >
          <Header
            textAlign='centered'
            as='h1'
            content='Slope Scheduler'
            //inverted
            style={{ fontSize: '4em', fontWeight: 'normal', marginTop: '1em', marginBottom: 0 }}
            
          />
          <div>
          <Header
            textAlign='center' as='h3'
            content='Login to view shifts that need a volunteer'
            //inverted
            style={{ fontSize: '1.5em', fontWeight: 'normal', marginTop: 0, marginBottom: '2em' }}
          />
          <h2 className="ui icon header">
                <i className="snowflake outline icon"></i>
              </h2>
          </div>
          <Segment style={{ padding: '1em 0em' }} vertical>
          <Grid container stackable verticalAlign='center'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>Thank you for being a volunteer!</Header>
                <p style={{ fontSize: '1.33em' }}>
                  Your time is valued and appreciated, so we hope that you will find this scheduler helpful and easy to use.
                </p>
                
              </Grid.Column>
              {/* <Grid.Column floated='right' width={6}>
              <Image
                  bordered
                  rounded
                  size='large'
                  src='/img/calendarImg.jpg'
                />
              </Grid.Column> */}
            </Grid.Row>
          </Grid>
        </Segment>

        </Container>
      </div>
    );
  }
}
export default withRouter(HomePage);