import React, { Component } from 'react';
import { Button, Checkbox, Form, Dropdown } from 'semantic-ui-react'
import DateInput from '../SelectDate/selectDate'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';




var Admin = observer(class Admin extends Component {
  constructor() {
    super()
    this.state = {

      title: '', //skill
      start: '',
      end: '',
      time: ''
    }
    this.shiftTime = [
      {
        text: 'Morning',
        value: 'morning',
     },
    {
      text: 'Afternoon',
      value: 'afternoon'
    }]

    this.skillLevels = [
      {
        text: 'Monoski',
        value: 'Monoski',
      },
      {
        text: 'Bi-ski',
        value: 'Bi-ski'
      },

      {
        text: "Tether",
        value: 'tether',
      },
      {
        text: "No Special Requirements",
        value: "No special requirements"
      }

    ]
   console.log(this.time)
    this.date = null;
    this.time = null;
    this.dateChange = this.dateChange.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  dateChange(date) {
    this.date = date;
    console.log(date);
  }

  handleSkill(event, d){
    this.setState({ title: d.value });
  }

  
  handleTime(event, d){
   this.setState({time: d.value})
  }


  handleClick(){  
    //console.log(this.props)
    console.log(this.state)
    //console.log(this.props.shiftStore);
    this.props.shiftStore.addNewShift(
      {
        date: this.date,
        time: this.state.time,
        title: this.state.title,
        start: this.date
      }
    ).then((res) => {
      if (res.data) {
        console.log("added shift");
        this.props.history.push('/fancycalendar');
      } else {
        console.log("failed")
      }
    }).catch((e) => {
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

            <label>Shift</label>
            <Dropdown onChange={this.handleTime} placeholder='Morning or Afternoon' fluid selection options={this.shiftTime} />

          </Form.Field>
          <Form.Field>
            <label>Skill</label>
            <Dropdown onChange={this.handleSkill} placeholder='Skill Level' fluid selection options={this.skillLevels} />
          </Form.Field>

          <Button onClick={this.handleClick} color='blue' fluid size='large'>Submit</Button>
          {/* <Button type='submit'>Submit</Button> */}
        </Form>
      </div>

    )
  }


})

export default withRouter(inject('shiftStore')(Admin));