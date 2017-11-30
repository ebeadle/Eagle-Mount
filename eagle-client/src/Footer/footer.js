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
import './footer.css';
 
export default class Footer extends Component {
  
  render () { 
    return (
      <div className="footer">
       
          <Container>
            <Grid divided inverted stackable>
            <Grid.Column width={5}>
                <Image as={Link} to="/" alt='logo' src='./img/logo.png' size='small'/>        
                </Grid.Column>

                <Grid.Column width={6}>
                  <Header inverted as='h7'>
                  </Header>
                  <List link inverted>
                    <a className="item" target="_blank" rel="noopener noreferrer" href="//eaglemount.org/">Eagle Mount Website</a> 
                
                    <a title="Bridger Bowl Snow Report" className="item" target="_blank" rel="noopener noreferrer" href='//bridgerbowl.com/weather/snow-report'>Bridger Bowl Snow Report</a> 
                  </List>
                </Grid.Column>
            </Grid>
          </Container>
      </div>
    )
  }
}