import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

var FancyCalendar = observer(class FancyCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
            // [
            //     {
            //         title: 'All Day Event',
            //         start: '2017-05-01'
            //     }
            // ]

        }
        this.callFetch = this.callFetch.bind(this)
    }

    callFetch() {
        this.props.shiftStore.fetchShift();
    }

    componentDidMount() {
        this.callFetch();
    }

    render() {
        console.log(this.props.shiftStore.shift[0]);
//if (this.props.shiftStore.shift) {
    //let events = [{start: '2017-11-21',
            //title: 'Intermediate' }]

      

    //this.props.shiftStore.shift
    //console.log(events);
    if(true) {
            return (
                <div id="example-component">
                    <FullCalendar
                        id="your-custom-ID"
                        header={{
                            left: 'prev,next today myCustomButton',
                            center: 'title',
                            right: 'month,basicWeek,basicDay'
                        }}
                        defaultDate={moment()}
                        navLinks={true} // can click day/week names to navigate views
                        editable={true}
                        eventLimit={true} // allow "more" link when too many events
                        events={this.props.shiftStore.retrieveShift} //{this.state.events}is the original
                    />
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