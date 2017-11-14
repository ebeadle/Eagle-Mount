import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import {FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap-date-picker';
var createReactClass = require('create-react-class');
var DatePicker = require("react-bootstrap-date-picker");


export default class Calendar extends Component {
  constructor(){
    super();
   var value = new Date().toISOString();
   return {
     value: value
   }

   this.handleChange=this.handleChange.bind(this);

 }
 handleChange(value, formattedValue) {
   this.setState({
     value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z" 
     formattedValue: formattedValue // Formatted String, ex: "11/19/2016" 
   });
 }

 componentDidUpdate(){
   // Access ISO String and formatted values from the DOM. 
   var hiddenInputElement = document.getElementById("example-datepicker");
   console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z" 
   console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016" 
 }
 render(){
   return <FormGroup>
     <ControlLabel>Label</ControlLabel>
     <DatePicker id="example-datepicker" value={this.state.value} onChange={this.handleChange} />
     <HelpBlock>Help</HelpBlock>
   </FormGroup>;
 }
};

