import React, {Component} from 'react';
import moment from "moment";
import authService from './service/auth/AuthenticationService';
import Translate from 'react-translate-component';
import DatePicker from "react-datepicker";
import timeSlotService from './service/timeslot-service';
import MyBookingsTable from "./MyBookingsTable";
import MyBookingsParticipantTable from "./MyBookingsParticipantTable";
import './MyBookingsPage.css';
import BookingInfo from "./BookingInfo";
import {AlertList} from "react-bs-notifier";

class MyBookingsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ownBookings: [],
            loadingOwn: true,
            participantBookings: [],
            loadingParticipant: true,
            beginDate: moment(),
            endDate:moment().add(14, 'days'),
            modalIsOpen: false,
            selectedBooking: null,
            alerts: []
        };

        this.handleBeginDateSelected = this.handleBeginDateSelected.bind(this);
        this.handleEndDateSelected = this.handleEndDateSelected.bind(this);
        this.getBookings = this.getBookings.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.selectBookingToShow = this.selectBookingToShow.bind(this);
        this.onCancelBookingClicked = this.onCancelBookingClicked.bind(this);
        this.onRateDone = this.onRateDone.bind(this);
        this.onDismissAlert = this.onDismissAlert.bind(this);

        this.props.changeNavbar("white");
    }

    componentWillMount(){
        this.getBookings();
    }

    getBookings(){
        this.setState({loadingParticipant: true, loadingOwn: true});

        timeSlotService.myBookings(true, this.state.beginDate, this.state.endDate).then(
            (ownBookings) => this.setState({ownBookings: ownBookings, loadingOwn: false}));

        timeSlotService.myBookings(false, this.state.beginDate, this.state.endDate).then(
            (participantBookings) => this.setState({participantBookings: participantBookings, loadingParticipant: false}));
    }

    handleBeginDateSelected(date){
        this.setState({ beginDate: date}, this.getBookings);
    }

    handleEndDateSelected(date){
        this.setState({ endDate: date}, this.getBookings);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#000';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    selectBookingToShow(booking){
        this.setState({selectedBooking: booking}, this.openModal());
    }

    onCancelBookingClicked(timeSlotId) {

        let newAlertsList = this.state.alerts;

        if(timeSlotId >= 0) {
            newAlertsList.push({
                id: this.state.alerts.length,
                type: "success",
                message: "Booking cancelled with success.",
                headline: "Booking Cancel"
            });


            let newOwnBookingsList = this.state.ownBookings;
            let booking = this.state.ownBookings.find(function (booking) {
                return booking.timeSlotId === timeSlotId;
            });
            let index = this.state.ownBookings.indexOf(booking);
            newOwnBookingsList.splice(index, 1);
            this.setState({
                ownBookings: newOwnBookingsList
            });


        } else{
            newAlertsList.push({
                id: this.state.alerts.length,
                type: "danger",
                message: "An error occurred. This booking might be already cancelled. Please, try again later.",
                headline: "Booking Cancel"
            });
        }

        this.setState({
            alerts: newAlertsList
        }, this.closeModal());
    }

    onRateDone(bookingId) {

        let newAlertsList = this.state.alerts;

        if(bookingId >= 0) {
            newAlertsList.push({
                id: this.state.alerts.length,
                type: "success",
                message: "Booking rated with success.",
                headline: "Booking Rate"
            });

            this.getBookings();

        } else{
            newAlertsList.push({
                id: this.state.alerts.length,
                type: "danger",
                message: "An error occurred. Please, try again.",
                headline: "Booking Rate"
            });
        }

        this.setState({
            alerts: newAlertsList
        }, this.closeModal());
    }

    onDismissAlert(alert) {
        let newAlertsList = this.state.alerts;

        let index = newAlertsList.indexOf(alert);
        if (index >= 0){
            newAlertsList.splice(index, 1);
        }

        this.setState({
            alerts: newAlertsList
        });
    }


    render() {
        if(authService.currentUserInfo() === null){
            window.location.href = '/';
        }

        return (
            <div className="page" style={{backgroundColor: "#F9F9F9"}}>
                {/*<header className="page-header"><div className="snow"/></header>*/}
                <div className="bg-warning text-white text-left" style={{paddingTop: "6px"}}>
                    <div className="d-inline-block date-param-margin-left">
                        <p className="d-inline-block"><Translate content="general.begin_date"/>:</p>
                        <div className="d-inline-block date-param-margin-left">
                            <DatePicker
                                showMonthDropdown
                                showYearDropdown
                                className="text-center font-weight-light"
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.beginDate}
                                onChange={this.handleBeginDateSelected}
                            />
                        </div>
                    </div>
                    <div className="d-inline-block date-param-margin-left">
                        <p className="d-inline-block"><Translate content="general.end_date"/>:</p>
                        <div className="d-inline-block date-param-margin-left">
                            <DatePicker
                                showMonthDropdown
                                showYearDropdown
                                className="text-center font-weight-light"
                                dateFormat="DD/MM/YYYY"
                                selected={this.state.endDate}
                                onChange={this.handleEndDateSelected}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <AlertList timeout={5000} onDismiss={this.onDismissAlert} alerts={this.state.alerts} />
                </div>
                <div className="bg-white div-shadow" style={{marginRight: "2%", marginLeft: "2%", marginTop: "2%", paddingTop: "10px"}}>
                    <div className="col-4 offset-4">
                        <h5><Translate content="mybookingspage.as_author"/></h5>
                        <hr style={{width: "55px", borderTop: "2px solid #FFC107", marginTop: "0", marginBottom: "10px"}}/>
                    </div>
                    <MyBookingsTable bookings={this.state.ownBookings}
                                     isLoading={this.state.loadingOwn}
                                     selectBookingToShow={this.selectBookingToShow}/>
                    <hr/>
                    <div className="col-4 offset-4">
                        <h5><Translate content="mybookingspage.as_participant"/></h5>
                        <hr style={{width: "55px", borderTop: "2px solid #FFC107", marginTop: "0", marginBottom: "10px"}}/>
                    </div>
                    <MyBookingsParticipantTable bookings={this.state.participantBookings}
                                                isLoading={this.state.loadingParticipant}
                                                selectBookingToShow={this.selectBookingToShow}/>
                    <BookingInfo openModal={this.openModal} afterOpenModal={this.afterOpenModal}
                                 onCancelBookingClicked={this.onCancelBookingClicked}
                                 closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}
                                 booking={this.state.selectedBooking} onRateDone={this.onRateDone}/>
                </div>
            </div>
        );
    }
}

export default MyBookingsPage;