import React, { Component } from 'react';
import { Header, Table, Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {inject, observer} from 'mobx-react';

var Calendar = observer(class Calendar extends Component {
  constructor(){
    super()
    this.callFetch = this.callFetch.bind(this)
    

    
  }

  callFetch(){
    this.props.shiftStore.fetchShift();
    
  }

  componentDidMount(){    
    this.callFetch();
  
  }

  
  render() {
    console.log(this.props.shiftStore.shift);
    this.dayList =[];
    this.props.shiftStore.shift.map((shift, i)=>{
   
      this.dayList.push( <Table.Cell key={i}> {shift.day} </Table.Cell>)
    })
    this.timeList = [];
    this.props.shiftStore.shift.map((shift, i)=>{
      this.timeList.push( <Table.Cell key={i}> {shift.time} </Table.Cell>)
    })

    this.skillList = [];
    this.props.shiftStore.shift.map((shift, i)=>{
      this.skillList.push( <Table.Cell key={i}> {shift.skill} </Table.Cell>)
    })

    this.dateList = [];
    this.props.shiftStore.shift.map((shift, i)=>{
      this.dateList.push( <Table.Cell key={i}> {shift.date} </Table.Cell>)
    })
  //  console.log(this.list);
  //   console.log(this.props.shiftStore)
    


    return (
      <div>
      
     
      <Table celled padded>
      <Table.Body>
    {this.dateList}
    
      <Table.Row>
        
        {this.dayList}
        
       </Table.Row>
    

    
      <Table.Row>
        {this.timeList}
        
               </Table.Row>
               <Table.Row>
        {this.skillList}
        
               </Table.Row>

    </Table.Body>
 </Table>
 </div>
 );
      
    
    }
})

export default withRouter(inject('shiftStore')(Calendar));