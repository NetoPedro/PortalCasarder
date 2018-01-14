import React, { Component } from 'react';
import DatePickerReact from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

class DatePicker extends Component {

    render() {
        return <DatePickerReact
            className="text-center font-weight-light"
            selected={this.props.date}
            onChange={this.props.handleChange}
            disabled={this.props.disabled}
            dateFormat="DD/MM/YYYY"
        />;
    }
}

export default DatePicker;