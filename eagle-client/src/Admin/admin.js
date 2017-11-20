import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import DateInput from '../SelectDate/selectDate'
import {inject, observer} from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';




var Admin = observer(class Admin extends Component {
  constructor() {
    super()
    this.state={
      day: '',
      skill: '',
      claimed: false,
      time: '',
      title: '',
      start: ''
    }
    this.date = null;
    this.dateChange = this.dateChange.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleClaimed = this.handleClaimed.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  dateChange(date){
    this.date = date; 
    console.log(date);
    //date.format()
    //date.toISOString();  
  }
  handleDay(event){
    console.log(event.target.value)
    this.setState({ day: event.target.value});
  }
  handleSkill(event){
    this.setState({ skill: event.target.value});
  }
  handleClaimed(event){
    this.setState({ claimed: event.target.value});
  }
  handleTime(event){
    this.setState({ time: event.target.value});
  }

  handleClick(){  
    //console.log(this.props)
    console.log(this.date)
    //console.log(this.props.shiftStore);
    this.props.shiftStore.addNewShift(
      {date: this.date,
      day: this.state.day,
      claimed: this.state.claimed,
      time: this.state.time,
      skill: this.state.skill,
      start: this.date
      }
    ).then((res)=> {
      if(res.data){
        console.log("added shift"); 
       this.props.history.push('/fancycalendar'); 
      } else {
        console.log("failed")
      }
    }).catch((e)=> {
      console.log(e)
    })
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>Date</label>
            {/* <input placeholder='02/12/2017' /> */}
            <DateInput type='text'
                dateChange={this.dateChange} />
          </Form.Field>
          <Form.Field>
            <label>Day</label>
            <input placeholder='Monday' type='text'
                value={this.state.day} onChange={this.handleDay}
                 />
          </Form.Field>
          <Form.Field>
            <label>Shift</label>
            <input placeholder='Morning' type='text'
                value={this.state.time} onChange={this.handleTime}/>
          </Form.Field>
          <Form.Field>
            <label>Skill</label>
            <input placeholder='Expert' type='text'
                value={this.state.skill} onChange={this.handleSkill}/>
          </Form.Field>
          <Form.Field>
            <label>Claimed</label>
            <input placeholder='Expert' type='checkbox'/>
                {/* value={this.state.claimed} onChange={this.handleClaimed}/> */}
          </Form.Field>
          <Button onClick={this.handleClick} color='blue' fluid size='large'>Submit</Button>
          {/* <Button type='submit'>Submit</Button> */}
        </Form>
      </div>

    )
  }


})

export default withRouter(inject('shiftStore')(Admin));