import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon, Table } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';



var PopUp = observer(class PopUp extends Component {
  constructor() {
    super()

  }

  render() {
    // debugger;
    console.log(this.props.shiftStore.selectedShift)
    if (true) {
      return (
        <div>

          <Modal open={this.props.shiftStore.modalPopUp} onClose={this.props.handleClose} closeIcon>
            <Header content='Eagle Mount' />
            <Modal.Content>
              <p>Thanks for volunteering! We need someone to cover this shift: </p>
              <Table collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Date and Time</Table.HeaderCell>
                    <Table.HeaderCell>Shift Time</Table.HeaderCell>
                    <Table.HeaderCell>Skill Required</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{this.props.shiftStore.selectedShift.date}</Table.Cell>
                    <Table.Cell>{this.props.shiftStore.selectedShift.time}</Table.Cell>
                    <Table.Cell>{this.props.shiftStore.selectedShift.title}</Table.Cell>
                  </Table.Row>
                </Table.Body>


              </Table>




            </Modal.Content>
            <Modal.Actions>
              <Button color='red'>
                <Icon name='remove' /> Delete This Shift
                                </Button>
              <Button color='blue'>
                <Icon name='checkmark' /> Claim This Shift
                                </Button>
            </Modal.Actions>
          </Modal>
        </div>
      );
    }
  }
})


export default withRouter(inject('shiftStore')(PopUp));







