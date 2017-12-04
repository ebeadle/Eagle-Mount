import React, { Component } from 'react';
import { Grid, Image, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

var Dashboard = observer(class Dashboard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.userStore.verifyUser() //checks user session so that page can refresh
  }

  render() {
    if (this.props.userStore.user) {
      console.log(this.props.userStore.user)
      //console.log(this.props.shiftStore.shift);
      this.titleList = [];
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



      return (
        <div>
          <Grid>
            <Grid.Column computer={8}>
              <h1>Dashboard</h1>
              <h2>Welcome, {this.props.userStore.user.firstName} {this.props.userStore.user.lastName} </h2>
              <p> The shifts that you signed up for: </p>
            </Grid.Column>
            <Grid.Column computer={8} mobile={16} tablet={8}>
            </Grid.Column>
          </Grid>

          <Table celled padded>
            <Table.Body>
              <Table.Row>
                {this.startList}
                {this.titleList}
              
              </Table.Row>
              {/* <Table.Row>
                {this.timeList}
              </Table.Row>

              <Table.Row>
              {this.titleList}
              </Table.Row> */}
            </Table.Body>
          </Table>
        </div>
      );

    } else {

      return (
        <div> "Please log in"</div>
      )
    }
  }
});

export default inject("userStore")(Dashboard);

