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
    this.props.dateChange(selectedDate.format("YYYY-MM-DD"))
    this.setState({ selectedDate });
  };
  

  render() {
    const value = this.state.selectedDate 
      ? this.state.selectedDate.format('YYYY-MM-DD') 
      : '';
    return (
      <DayPickerInput
        name="birthday"
        placeholder="enter date to edit"
        format="MM/DD/YYYY"
        value={value}
        onDayChange={this.handleDateChange}
        z-index='99'
      />
    );
  }
}