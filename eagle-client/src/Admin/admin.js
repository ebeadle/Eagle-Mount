import React, { Component } from 'react';
import { Button, Form, Header, Card, Dropdown, Divider, Container } from 'semantic-ui-react'
import DateInput from '../SelectDate/selectDate'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './admin.css'

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
        value: 'Morning',
     },
    {
      text: 'Afternoon',
      value: 'Afternoon'
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
        value: 'Tether',
      },
      {
        text: "No Special Requirements",
        value: "No Special Requirements"
      }

    ]
    this.date = null;
    this.time = null;
    this.dateChange = this.dateChange.bind(this);
    this.handleSkill = this.handleSkill.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  dateChange(date) {
    this.date = date;
  }

  handleSkill(event, d){
    this.setState({ title: d.value });
  }

  
  handleTime(event, d){
   this.setState({time: d.value})
  }

  handleClick(){  
  var m = moment(this.date)
  if(this.state.time === 'Morning'){
    m.set({hour:10, minute:30, second:0, millisecond:0})
    var newTime = m.format()
  } else {
    m.set({hour:13, minute:30, second:0, millisecond:0})
    newTime = m.format()
  }
 
  
    this.props.shiftStore.addNewShift(
      {
        date: this.date,  
        time: this.state.time,
        title: this.state.title,
        start: newTime
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

  componentDidMount() {
    this.props.userStore.verifyUser() //checks user session so that page can refresh
  }


  render() {
    return (
      <div>
     
         <Card className='admin-card' centered color={'black'}>
         <Header textAlign='centered'>
         Admin
         </Header>
        <Form display='block'>
      
        <Container>
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
          </Container>
          <Divider />
          <Button className='admin-button' color='black' onClick={this.handleClick} fluid size='small'>Submit</Button>
          {/* <Button type='submit'>Submit</Button> */}
        </Form>
        </Card> 
      </div>

    )
  }


})

export default withRouter(inject('shiftStore', 'userStore')(Admin));