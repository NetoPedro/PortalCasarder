import React, { Component } from 'react';
import moment from "moment";
import $ from 'jquery';


class TimeSlotsTable extends Component {
    static defaultProps = {
        timeSlots: [],
        date: moment()
    };

    render() {

        $(document).ready(function() {
            $('#timeSlotsTable').on('click', '.clickable-row', function (event) {
                $(this).css('border', "solid 2px #FFC107");
                $(this).siblings().css('border', "inherit");
            });
        });

        let timeSlots = this.props.timeSlots.map((ts) => {
            console.log(this.props.timeSlots);
            console.log(ts);
            var begin = moment(ts.beginTime, "MM/DD/YYYY hh:mm:ss a");
            var end = moment(ts.endTime, "MM/DD/YYYY hh:mm:ss a");

            return (
                <tr key={ts.id} className="clickable-row" onClick={tr => this.props.handleTimeSlotSelected(ts)}>
                    <td>{begin.hour() + ":" + begin.minute()}</td>
                    <td>{end.hour() + ":" + end.minute()}</td>
                    <td>{ts.price}</td>
                </tr>
            )
        });

        var rowsTimeSlots = (timeSlots.length === 0)?
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
            : timeSlots;


        return (
            <table id="timeSlotsTable" className="table table-responsive table-bordered table-hover" style={{display: "table"}}>
                <thead>
                <tr>
                    <th style={{padding: "6px"}} colSpan={3}>Date: {this.props.date.format("DD / MM / YYYY")}</th>
                </tr>
                <tr>
                    <th style={{padding: "6px"}}>Begin time</th>
                    <th style={{padding: "6px"}}>End time</th>
                    <th style={{padding: "6px"}}>Price</th>
                </tr>
                </thead>
                <tbody>
                {rowsTimeSlots}
                </tbody>
            </table>

        );
    }
}

export default TimeSlotsTable;