import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class DateInput extends React.Component {
  state = {
    selectedDate: undefined,
    value:null
  }
  handleDateChange = selectedDate => {
    this.props.dateChange(selectedDate.format("MM/DD/YYYY"))
    this.setState({ selectedDate });
  };
  

  render() {
    const value = this.state.selectedDate 
      ? this.state.selectedDate.format('MM/DD/YYYY') 
      : '';
    return (
      <DayPickerInput
        name="birthday"
        placeholder="MM/DD/YYYY"
        format="MM/DD/YYYY"
        value={value}
        onDayChange={this.handleDateChange}
      />
    );
  }
}