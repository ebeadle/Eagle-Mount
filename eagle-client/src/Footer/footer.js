import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

import {
  Container,
  Grid,
  Header,
  Image,
  List,
  Segment
 } from 'semantic-ui-react';
 
export default class Footer extends Component {
  
  render () { 
    return (
      <div className="footer">
       
          <Container>
            <Grid divided inverted stackable>
            <Grid.Column width={5}>
                <Image as={Link} to="/" alt='slope scheduler' src='./img/logo.png' size='small' />        
                </Grid.Column>

                <Grid.Column width={6}>
                  <Header inverted as='h7'>
                  </Header>
                  <List link inverted>
                  
                  <a title="Bridger Bowl" className="item" target="_blank" rel="noopener noreferrer" href='http://eaglemount.org/'>Eagle Mount Website</a> 
                    <a title="Bridger Bowl" className="item" target="_blank" rel="noopener noreferrer" href='https://bridgerbowl.com/weather/snow-report'>Bridger Bowl Snow Report</a> 
                  </List>
                </Grid.Column>
                {/* <Grid.Column width={5}> */}
                  {/* <Header inverted as='h5'>
                  </Header> */}
                  {/* <Weather /> */}
                {/* </Grid.Column> */}
                
              {/* </Grid.Row> */}
            </Grid>
          </Container>
      </div>
    )
  }
}