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
            modalOpen: false,
             
        }
        
        this.eventClick = this.eventClick.bind(this);
        this.callFetch = this.callFetch.bind(this);
       
    }

    
    eventClick(e, jsE, v) {
        console.log(e)
        this.setState({modalOpen: true})
    }

    callFetch() {
        this.props.shiftStore.fetchShifts();
    }

    componentDidMount() {
        this.callFetch();
    }

    render() {
        if (true) {
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
                        eventLimit={true} // allow "more" link when too many events
                        events={this.props.shiftStore.retrieveShift} //{this.state.events}is the original
                        defaultTimedEventDuration={'02:00:00'}
                        displayEventEnd={true}
                        defaultView={'agendaWeek'}
                        slotDuration={'00:30:00'}
                        slotLabelInterval={'30'}
                        slotLabelFormat={'h(:mm)a'}
                    />
                    <PopUp />

                </div>
            );
        } else {
            return (
                <div>Loading</div>
            )
        }
    }
})

export default withRouter(inject('shiftStore')(FancyCalendar));