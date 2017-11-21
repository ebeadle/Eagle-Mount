import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react'

export default class PopUp extends Component {
  constructor() {
    super()
    this.state = {
      modalOpen: false
    }
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <div>
      <Modal open={this.state.modalOpen} onClose={this.handleClose} closeIcon>
                            <Header content='Eagle Mount' />
                            <Modal.Content>
                                <p>Thanks for volunteering! We need someone to cover this shift</p>
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






