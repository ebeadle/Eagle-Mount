
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Modal, Icon } from 'semantic-ui-react'
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

    return new Promise((resolve, reject) => {
      axios.post('/claimShift', {
        shiftId: this.props.shiftStore.selectedShift._id,
        userId: this.props.userStore.user._id,
        userFirst: this.props.userStore.user.firstName,
        shift: this.props.shiftStore.selectedShift
      })
      .then((res) => {
        this.props.shiftStore.shifts = res.data
        this.props.shiftStore.fetchShifts();
        
        resolve(res);
      })
  })}

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  componentDidMount() {
    
    this.props.userStore.verifyUser() //checks user session so that page can refresh
  }

  render() {
    const { open } = this.state
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
          <Modal.Header>Thank you {this.props.userStore.user.firstName} for covering this Shift!  </Modal.Header>
          <Modal.Content>
            <p>See you in the {this.props.shiftStore.selectedShift.time} on {this.props.shiftStore.selectedShift.date} An Email has been sent to the Eagle Mount Office confirming you'll cover this shift.
            We appreciate you!</p>
            
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