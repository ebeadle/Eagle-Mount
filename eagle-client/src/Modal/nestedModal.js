
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon, Table } from 'semantic-ui-react'
var axios = require('axios');
var NestedModal = observer(class PopUp extends Component {
  constructor() {
    super()
    this.state = { open: false }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.claimShift = this.claimShift.bind(this)

  }
  claimShift() {
    console.log(this.props.shiftStore.selectedShift._id)
    console.log(this.props.userStore.user.user._id)
  
      axios.post('/claimShift', {
        shiftId: this.props.shiftStore.selectedShift._id,
        userId: this.props.userStore.user.user._id
      })
      .then((res) => {
        this.props.shiftStore.shifts = res.data
        console.log(this.props.shiftStore.shifts)
      })
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state
    console.log(this.props.userStore.user.user._id);
    return (
      <div>
        <Modal
          dimmer={false}
          open={open}
          onOpen={this.open}
          onClose={this.close}
          size='small'
          trigger={<Button onClick={this.claimShift} primary icon>Claim This Shift<Icon name='right chevron' /></Button>}
        >
          <Modal.Header>Thank you {this.props.shiftStore.selectedShift._id} for covering this Shift!</Modal.Header>
          <Modal.Content>
            <p>See you in the {this.props.shiftStore.selectedShift.time} on {this.props.shiftStore.selectedShift.date} We appreciate you!</p>
            
          </Modal.Content>
          <Modal.Actions>
            <Button icon='check' onClick={this.props.handleClose} content='All Done'  />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
});

export default withRouter(inject('shiftStore', 'userStore')(NestedModal));