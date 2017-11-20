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
      date: '',
      title: '',
      start: ''
    }
    this.date = null;
    this.dateChange = this.dateChange.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  dateChange(date){
    this.date = date; 
    console.log(date);
    //date.format()
    //date.toISOString();  
  }

  handleTitle(event){
    this.setState({ title: event.target.value});
  }

  
  handleClick(){  
    //console.log(this.props)
    console.log(this.date)
    //console.log(this.props.shiftStore);
    this.props.shiftStore.addNewShift(
      {date: this.date,
      title: this.state.title,
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
         
          {/* <Form.Field>
            <label>Shift</label>
            <input placeholder='Morning' type='text'
                value={this.state.time} onChange={this.handleTime}/>
          </Form.Field> */}
          <Form.Field>
            <label>Skill</label>
            <input placeholder='Expert' type='text'
                value={this.state.title} onChange={this.handleTitle}/>
          </Form.Field>
         
          <Button onClick={this.handleClick} color='blue' fluid size='large'>Submit</Button>
          {/* <Button type='submit'>Submit</Button> */}
        </Form>
      </div>

    )
  }


})

export default withRouter(inject('shiftStore')(Admin));