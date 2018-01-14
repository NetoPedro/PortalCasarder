import React, { Component } from 'react';
import Modal from 'react-modal';
import moment from "moment";
import {Link} from "react-router-dom";
import QRCode from 'qrcode.react';
import ReactConfirmAlert from 'react-confirm-alert';
import timeSlotService from './service/timeslot-service';
import './BookingInfo.css';
import RateBookingSection from "./RateBookingSection";
import Comment from "./Comment";
import Translate from "react-translate-component";

const customStyles = {
    content : {
        marginTop: "54px",
        marginLeft: "20%",
        marginRight: "20%",
        paddingLeft: "5%",
        paddingRight: "5%",
        overflowY: "scroll"
    }
};

class BookingInfo extends Component {
    constructor(props){
        super(props);

        this.state = {
            showRateSection: false,
            showCancelConfirmation: false
        };

        this.onCancelBookingClicked = this.onCancelBookingClicked.bind(this);
        this.showRateSection = this.showRateSection.bind(this);
        this.hideRateSection = this.hideRateSection.bind(this);
        this.onRateDone = this.onRateDone.bind(this);
        this.showCancelConfirmation = this.showCancelConfirmation.bind(this);
        this.hideCancelConfirmation = this.hideCancelConfirmation.bind(this);
    }

    static defaultProps = { booking: Object };

    onCancelBookingClicked(){
        let main = this;
        timeSlotService.cancelBooking(this.props.booking.timeSlotId).then(function (timeSlotId) {
            main.props.onCancelBookingClicked(timeSlotId);
        });
    }

    showCancelConfirmation(){
        this.setState({showCancelConfirmation: true});
    }

    hideCancelConfirmation(){
        this.setState({showCancelConfirmation: false});
    }

    onRateDone(id){
        this.hideRateSection();
        this.props.onRateDone(id);
    }

    showRateSection() {
        this.setState({showRateSection: true});
    }

    hideRateSection() {
        this.setState({showRateSection: false});
    }

    render() {
        let begin;
        let end;
        let participantsList = [];
        let equipmentsList = [];
        let equipmentsPriceList = [];

        if(this.props.booking) {
            begin = moment(this.props.booking.beginTime, "MM/DD/YYYY hh:mm:ss a");
            end = moment(this.props.booking.endTime, "MM/DD/YYYY hh:mm:ss a");

            if(this.props.booking.participantsEmail !== undefined) {

                participantsList = this.props.booking.participantsEmail.map(p => {
                    return (
                        <li className="list-group-item">{p}</li>
                    );
                });
            }

            if(this.props.booking.bookedSupplementalEquipments !== undefined) {

                equipmentsList = this.props.booking.bookedSupplementalEquipments.map(e => {
                    return (
                        <li className="list-group-item">{e.name}</li>
                    );
                });

                equipmentsPriceList = this.props.booking.bookedSupplementalEquipments.map(e => {
                    return (
                        <div className="row justify-content-between row-margin-bottom">
                            <div className="col">
                                - {e.name} price
                            </div>
                            <div className="col text-right">
                                {e.price}€
                            </div>
                        </div>
                    );
                });
            }
        }

        return (
            this.props.booking?
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.props.afterOpenModal}
                    onRequestClose={this.props.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="text-center">
                        <h2 className="d-inline-block font-weight-bold"><Translate content="general.booking"/></h2>
                        <button className="close d-inline-block" onClick={this.props.closeModal}><span aria-hidden="true">&times;</span></button>
                    </div>
                    <hr style={{width: "80%", borderColor: "#FFC107", borderWidth: "2px"}}/>
                    <div className="h5" >
                        <div className="container text-center">
                            <QRCode value={this.props.booking.qrCode}/>
                        </div>
                        <div className="row justify-content-between row-margin-bottom">
                            <div className="col">
                                <b><Translate content="general.facility"/></b>
                            </div>
                            <div className="col text-right">
                                <Link to={{ pathname: '/facility', search: '?facilityId=' + this.props.booking.facilityId}}>
                                    {this.props.booking.facilityName}
                                </Link>
                            </div>
                        </div>
                        <div className="row justify-content-between row-margin-bottom">
                            <div className="col">
                                <b><Translate content="general.date"/></b>
                            </div>
                            <div className="col text-right">
                                {begin.format('DD/MM/YYYY')}
                            </div>
                        </div>
                        <div className="row justify-content-between row-margin-bottom">
                            <div className="col">
                                <b><Translate content="general.begin_time"/></b>
                            </div>
                            <div className="col text-right">
                                {begin.hour() + ":" + begin.format('mm')}
                            </div>
                        </div>
                        <div className="row justify-content-between row-margin-bottom">
                            <div className="col">
                                <b><Translate content="general.end_time"/></b>
                            </div>
                            <div className="col text-right">
                                {end.hour() + ":" + end.format('mm')}
                            </div>
                        </div>
                        {participantsList.length?
                            <div className="row justify-content-between row-margin-bottom">
                                <div className="col">
                                    <h5><b><Translate content="general.participants"/>:</b></h5>
                                    {participantsList}
                                </div>
                            </div>
                            :
                            <div/>
                        }
                        {equipmentsList.length?
                            <div className="row justify-content-between row-margin-bottom">
                                <div className="col">
                                    <h5><b><Translate content="general.supplemental_equipments"/>:</b></h5>
                                    {equipmentsList}
                                </div>
                            </div>
                            :
                            <div/>
                        }
                        {this.props.booking.totalPrice !== undefined ?
                            <div>
                                <hr/>
                                <div className="row justify-content-between row-margin-bottom">
                                    <div className="col">
                                        <h5><b>Price</b></h5>
                                        <div style={{paddingLeft: "15px"}}>
                                            <div className="row justify-content-between row-margin-bottom">
                                                <div className="col">
                                                    - Time slot <Translate content="general.price"/>
                                                </div>
                                                <div className="col text-right">
                                                    {Math.round(this.props.booking.timeSlotPrice * 100) / 100}€
                                                </div>
                                            </div>
                                            {equipmentsPriceList}
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row justify-content-between row-margin-bottom">
                                    <div className="col text-uppercase font-weight-bold">
                                Total
                                </div>
                                <div className="col text-right">
                                {Math.round(this.props.booking.totalPrice * 100) / 100}€
                                </div>
                                </div>
                            </div>
                            :
                            <div/>
                        }
                        <hr/>
                        {this.props.booking.totalPrice !== undefined && begin.isAfter(moment())?
                            <div className="row">
                                <button className="btn btn-danger" onClick={this.showCancelConfirmation}>
                                    <Translate content="general.cancel"/> <Translate content="general.booking"/>
                                </button>
                                {
                                    this.state.showCancelConfirmation &&
                                    <ReactConfirmAlert
                                        title="Cancel Booking"
                                        message="Are you sure you want to cancel this booking?"
                                        confirmLabel="Yes"
                                        cancelLabel="No"
                                        onConfirm={this.onCancelBookingClicked}
                                        onCancel={this.hideCancelConfirmation}
                                    />
                                }
                            </div>
                            :
                            this.props.booking.rating !== null?
                                this.state.showRateSection ?
                                    <RateBookingSection rating={this.props.booking.rating}
                                                        bookingId={this.props.booking.id}
                                                        onRateDone={this.onRateDone}
                                                        isAuthor={this.props.booking.totalPrice !== undefined}
                                    />
                                    :
                                    <div>
                                        <Comment rating={this.props.booking.rating} showAll={true}/>
                                        <button className="btn btn-warning" style={{float: "right"}}
                                                onClick={this.showRateSection}>
                                            <Translate content="bookinginfomodal.editrating"/>
                                        </button>
                                    </div>
                                :
                                end.isBefore(moment())?
                                    <div className="row">
                                        {this.state.showRateSection ?
                                            <RateBookingSection rating={this.props.booking.rating}
                                                                bookingId={this.props.booking.id}
                                                                onRateDone={this.onRateDone}
                                                                isAuthor={this.props.booking.totalPrice !== undefined}
                                            />
                                            :
                                            <button className="btn btn-warning" style={{float: "right"}} onClick={this.showRateSection}>
                                                <Translate content="bookinginfomodal.ratebooking"/>
                                            </button>
                                        }
                                    </div>
                                    :
                                    <div/>
                        }
                    </div>
                </Modal>
            </div>
                :
                <div/>
        );}
}

export default BookingInfo;