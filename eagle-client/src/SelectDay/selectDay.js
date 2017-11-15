import React from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class DateInput extends React.Component {
  state = {
    selectedDay: undefined,
  }
  handleDayChange = selectedDay => {
    this.setState({ selectedDay });
  };
  render() {
    const value = this.state.selectedDay 
      ? this.state.selectedDay.format('MM/DD/YYYY') 
      : '';
    return (
      <DayPickerInput
        name="birthday"
        placeholder="MM/DD/YYYY"
        format="MM/DD/YYYY"
        value={value}
        onDayChange={this.handleDayChange}
      />
    );
  }
}