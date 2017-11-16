import React, { Component } from 'react';
import { Header, Table, Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {inject, observer} from 'mobx-react';

var Calendar = observer(class Calendar extends Component {
  constructor(){
    super()
    this.callFetch = this.callFetch.bind(this)


  }

  callFetch(){
    this.props.shiftStore.fetchShift();
  }

  componentDidMount(){    
    this.callFetch();
  }
  
  render() {

    console.log(this.props.shiftStore.shift)




    return (
      <Table celled padded>
    <Table.Header>
      <Table.Row>
        
        <Table.HeaderCell>Sunday</Table.HeaderCell>
        <Table.HeaderCell>Monday</Table.HeaderCell>
        <Table.HeaderCell>Tuesday</Table.HeaderCell>
        <Table.HeaderCell>Wednesday</Table.HeaderCell>
        <Table.HeaderCell>Thursday</Table.HeaderCell>
        <Table.HeaderCell>Friday</Table.HeaderCell>
        <Table.HeaderCell>Saturday</Table.HeaderCell>
        
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          
          Morning
        </Table.Cell>

        <Table.Cell > Morning  </Table.Cell>

        <Table.Cell> Morning</Table.Cell>
        
        <Table.Cell> Morning </Table.Cell>
        
        <Table.Cell>Morning</Table.Cell>

        <Table.Cell>Morning</Table.Cell>

        <Table.Cell>Morning</Table.Cell>
        
          
      </Table.Row>

      <Table.Row>
        <Table.Cell>Afternoon </Table.Cell>
    
        <Table.Cell >Afternoon</Table.Cell>

        <Table.Cell> Afternoon</Table.Cell>
        
        <Table.Cell> Afternoon </Table.Cell>
        
        <Table.Cell>Afternoon</Table.Cell>

        <Table.Cell>Afternoon</Table.Cell>

        <Table.Cell>Afternoon</Table.Cell>
        
          
      </Table.Row>
      
      
        
      
    </Table.Body>
  </Table>
);
      
    
  }
})

export default withRouter(inject('shiftStore')(Calendar));