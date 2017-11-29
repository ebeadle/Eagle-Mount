import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon, Card} from 'semantic-ui-react'
import PopUp from "../Modal/modal"


var FancyCalendar = observer(class FancyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],

    }
    this.handleClose = this.handleClose.bind(this);
    this.eventClick = this.eventClick.bind(this);
    this.callFetch = this.callFetch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fancyCalendarDelete = this.fancyCalendarDelete.bind(this);

  }
  handleClose = () => { this.props.shiftStore.modalPopUp = false };


  eventClick(e, jsE, v) {
    delete e.source; //the event source data was being continuously looped by mobx so it gets deleted here before the rest of the event gets assigned.
    this.props.shiftStore.selectedShift = e;
    this.props.shiftStore.modalPopUp = true;
    console.log(this.props.shiftStore.selectedShift.user)
    if(this.props.shiftStore.selectedShift.user){
      this.props.shiftStore.modalPopUp = false;
    } 
    if (this.props.userStore.user.admin === "admin"){
      this.props.shiftStore.modalPopUp = true
    }
  }


  eventRender(event, element) {
    if(event.user){
    console.log(event.user.firstName)
    element.append(`Claimed by: ${event.user.firstName}`)
  }
}


  callFetch() {
    this.props.shiftStore.fetchShifts();
  }

  fancyCalendarDelete() {
    this.props.shiftStore.deleteShift();
  }

  componentDidMount() {
    console.log(this.props.shiftStore)
    this.callFetch();
  }

  render() {
    if (this.props.userStore.user) {

      return (
        <div >

          <FullCalendar
            header={{
              left: 'prev,next today myCustomButton',
              center: 'title',
              right: 'month'
            }}
            eventClick={this.eventClick}
            defaultDate={moment()}
            navLinks={true} // can click day/week names to navigate views
            editable={false}
            eventRender={this.eventRender}
            allDaySlot={false}
            allDayText={false}
            eventLimit={true} // allow "more" link when too many events
            events={this.props.shiftStore.retrieveShift} //{this.state.events}is the original
            displayEventTime={true}
            defaultTimedEventDuration={'02:00:00'}
            displayEventEnd={true}
            defaultView={'agendaWeek'}
            //slotDuration={'00:30:00'}
            //slotLabelInterval={'30'}
            slotLabelFormat={'h(:mm)a'}
            minTime={'9:00:00'}
            maxTime={'19:00:00'}
            height={550}
          />
          <PopUp fancyCalendarDelete={this.fancyCalendarDelete} handleClose={this.handleClose} />

        </div>
      );
    } else {
      
      return (
        <div>
          <Card centered color={'black'}>
            <Image src='/assets/images/avatar/large/matthew.png' />
            <Card.Content>
              <Card.Header>
                Welcome to the Eagle Mount Calendar!
                </Card.Header>
             
              <Card.Description>
               Please Log in to view the open shifts
                </Card.Description>
            </Card.Content>
            
          </Card> 
          </div>
      )
    }

  }
})


export default withRouter(inject('shiftStore', 'userStore')(FancyCalendar));