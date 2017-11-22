import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button, Form, Grid, Header, Image, Message, Segment, Modal, Icon } from 'semantic-ui-react'
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
       
    }
    handleClose = () => {this.props.shiftStore.modalPopUp=false};
    
    
    eventClick(e, jsE, v) {
        console.log(e)
        delete e.source; //the event source data was being continuously looped by mobx so it gets deleted here before the rest of the event gets assigned.
        this.props.shiftStore.selectedShift = e;
        this.props.shiftStore.modalPopUp = true;
    }


    callFetch() {
        this.props.shiftStore.fetchShifts();
    }

    componentDidMount() {
        this.callFetch();
    }

    render() {
        
            return (
                <div id="example-component">
                    
                    <FullCalendar
                        id="your-custom-ID"
                        header={{
                            left: 'prev,next today myCustomButton',
                            center: 'title',
                            right: 'month,basicWeek,basicDay'
                        }}
                        eventClick={this.eventClick}
                        defaultDate={moment()}
                        navLinks={true} // can click day/week names to navigate views
                        editable={false}
                        allDay={false}
                        allDayText={""}
                        eventLimit={true} // allow "more" link when too many events
                        events={this.props.shiftStore.retrieveShift} //{this.state.events}is the original
                        //displayEventTime={true}
                        defaultTimedEventDuration={'02:00:00'}
                        displayEventEnd={true}
                        defaultView={'agendaWeek'}
                        //slotDuration={'00:30:00'}
                        //slotLabelInterval={'30'}
                        slotLabelFormat={'h(:mm)a'}
                    />
                    <PopUp handleClose={this.handleClose} />

                </div>
            );
        
    }
})

export default withRouter(inject('shiftStore')(FancyCalendar));