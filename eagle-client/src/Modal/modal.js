import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon, Table } from 'semantic-ui-react'
var axios = require('axios');

var PopUp = observer(class PopUp extends Component {
    constructor() {
        super()
        this.deleteShift = this.deleteShift.bind(this)
    }

    // function deleteData(clickEvent){
        
    //     var data =  $(clickEvent.srcElement).data().id
    //     $.ajax({
    //     url: {insert url},
    //     type: 'DELETE',
    //     data:{id:data},
    //     success: function(result) {
    //         setTable();
    //     }
    //     });
    // }

    deleteShift() {
        console.log(this.props.shiftStore.selectedShift._id)
        console.log('delete shift')
        axios.post('/deleteShift', {
            _id: this.props.shiftStore.selectedShift._id}
        ).then((shiftObj) => {
            if (shiftObj.data) {
                this.shift = shiftObj.data;
            } else {
                console.log('NO')
        }
        })
    }

    render() {
        return (
            <div>
                <Modal open={this.props.shiftStore.modalPopUp} onClose={this.props.handleClose} closeIcon>
                    <Header content='Eagle Mount' />
                    <Modal.Content>
                        <p>Thanks for volunteering! We need someone to cover this shift:</p>
                        <Table collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Date and Time</Table.HeaderCell>
                                    <Table.HeaderCell>Shift</Table.HeaderCell>
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
                        <Button color='red' onClick={this.deleteShift} >
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
})



export default withRouter(inject('shiftStore')(PopUp));


