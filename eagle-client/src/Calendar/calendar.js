import React, { Component } from 'react';
import { Header, Table, Rating } from 'semantic-ui-react'

export default class Calendar extends Component {
  render() {
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
}