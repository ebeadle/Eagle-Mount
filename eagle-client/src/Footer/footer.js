import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import Weather from '../weather/Weather';
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
                <Image as={Link} to="/" alt='Eagle Mount Bozeman' src='https://static1.squarespace.com/static/55e10aede4b023ac4136bb15/566634a9a976afddc7098140/5673106fc647ad862c4cb8f1/1450381490626/Eaglemount.png' />        
                </Grid.Column>

                <Grid.Column width={6}>
                  <Header inverted as='h7'>
                  </Header>
                  <List link inverted>
                    <a className="item" target="_blank" rel="noopener noreferrer" href="//eaglemount.org/">Eagle Mount Bozeman Official Website</a> 
                    <Link className="item" to="/contactinfo">Contact Us?</Link>
                    <a title="Weather at North Entrance" className="item" target="_blank" rel="noopener noreferrer" href='https://forecast.weather.gov/MapClick.php?zoneid=WYZ001'>Current Weather</a> 
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