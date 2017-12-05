import React, { Component } from 'react';
import { Grid, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

var Dashboard = observer(class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }
  }

  componentDidMount() {
    this.props.userStore.verifyUser().then(()=>{ //checks user session so that page can refresh
  }, (errorMessage)=>{
      this.props.history.push('/login')
    });
  }

  render() {
    if (this.props.userStore.user) {
      console.log(this.props.userStore.user)
      //console.log(this.props.userStore.user.shifts);
      this.titleList = [];
      //if (this.state.loaded) {
        
      this.props.userStore.user.shifts.map((user, i) => {

        console.log(user)
        this.titleList.push(<Table.Cell key={i}> {user.title} </Table.Cell>)
      })
      this.timeList = [];
      this.props.userStore.user.shifts.map((user, i) => {
        this.timeList.push(<Table.Cell key={i}> {user.time} </Table.Cell>)
      })

      this.startList = [];
      this.props.userStore.user.shifts.map((user, i) => {
        this.startList.push(<Table.Cell key={i}> {user.date} </Table.Cell>)
      })

      this.shiftData = [];
      this.props.userStore.user.shifts.map((user, i) => {
        this.shiftData.push(
          <Table.Row>
          <Table.Cell key={i}> {user.date} </Table.Cell> 
          <Table.Cell key={i}> {user.time} </Table.Cell> 
          <Table.Cell key={i}> {user.title} </Table.Cell>
          </Table.Row>)
      })
    //}


      return (
        <div>
          <Grid >
            <Grid.Column computer={8}>
              
              <h1>Welcome, {this.props.userStore.user.firstName} {this.props.userStore.user.lastName} </h1>
              <h3> The shift(s) that you signed up for: </h3>
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
           
            </Grid.Column>
          </Grid>

          <Table celled padded >
          <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Time of Day</Table.HeaderCell>
        <Table.HeaderCell>Skill Level Needed</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
            <Table.Body >
              
                {this.shiftData}
              
            </Table.Body>
          </Table>
          
        </div>
      );

    } else {

      return (
        <div> Loading...</div>
      )
    }
  }
});

export default withRouter(inject("userStore")(Dashboard));

