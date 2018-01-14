import React, { Component } from 'react';
import moment from "moment";
import Translate from 'react-translate-component';
import ReactLoading from 'react-loading';

class MyBookingsTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    render() {

        let bookingRows;

        if(this.props.bookings !== undefined && !this.props.isLoading) {
            if(this.props.bookings.length) {
                bookingRows = this.props.bookings.map(booking => {
                    let begin = moment(booking.beginTime, "MM/DD/YYYY hh:mm:ss a");
                    let end = moment(booking.endTime, "MM/DD/YYYY hh:mm:ss a");

                    return (
                        <tr key={booking.id}>
                            <th scope="row" className="text-left">{booking.facilityName}</th>
                            <td>{begin.format('DD/MM/YYYY')}</td>
                            <td>{begin.hour() + ":" + begin.format('mm')}</td>
                            <td>{end.hour() + ":" + end.format('mm')}</td>
                            <td>{Math.round(booking.totalPrice * 100) / 100}</td>
                            <td>{booking.countParticipants}</td>
                            <td>{booking.bookedSupplementalEquipments.length}</td>
                            <td onClick={t => {this.props.selectBookingToShow(booking)}}><span className="btn btn-warning"><b>+</b></span></td>
                        </tr>
                    );
                });
            } else {
                bookingRows = <tr><td colSpan={8}><Translate content="mybookingspage.no_bookings"/></td></tr>;
            }
        }else {
            bookingRows = <tr><td colSpan={8}><ReactLoading type="spin" color="#F3C043" delay={0} className="loading-spin-center-inside"/></td></tr>;
        }

        return (
            <div style={{overflow: "auto", maxHeight: "300px"}}>
                <table className="table table-hover table-responsive-sm">
                    <thead>
                    <tr className="text-warning text-capitalize">
                        <th scope="col" className="text-left"><Translate content="general.facility"/></th>
                        <th scope="col"><Translate content="general.date"/></th>
                        <th scope="col"><Translate content="general.begin_time"/></th>
                        <th scope="col"><Translate content="general.end_time"/></th>
                        <th scope="col"><Translate content="general.price"/></th>
                        <th scope="col"><Translate content="general.participants"/></th>
                        <th scope="col"><Translate content="general.supplemental_equipments"/></th>
                        <th scope="col"/>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyBookingsTable;