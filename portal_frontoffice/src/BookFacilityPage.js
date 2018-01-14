import React, {Component} from 'react';
import './BookFacilityPage.css';
import RatingStars from "./RatingStars";
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import moment from "moment";
import authService from './service/auth/AuthenticationService';
import facilityService from './service/facility-service';
import timeSlotService from './service/timeslot-service';
import success from './img/success.png';
import failed from './img/failed.png';
import BookingResultMessage from "./BookingSuccessMessage";
import Forecast from './SimpleForecast';
import Translate from "react-translate-component";

class BookFacilityPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            facility: Object,
            timeSlot: Object,
            emailInput: "",
            emailIsValid: false,
            inviteEmails: [],
            selectedSupplementalEquipments: [],
            total: 0,
            tryingToBook: null,
            bookingMessage: "Booking this facility...",
            success: null,
            modalIsOpen: false
        };

        this.addInvite = this.addInvite.bind(this);
        this.removeInvite = this.removeInvite.bind(this);
        this.updateEmailInputValue = this.updateEmailInputValue.bind(this);
        this.toggleSupplementalEquipment = this.toggleSupplementalEquipment.bind(this);
        this.book = this.book.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.props.changeNavbar("white");
    }

    componentWillMount() {
        const parsed = queryString.parse(this.props.location.search);

        let main = this;

        timeSlotService.timeSlotById(parsed.timeSlotId)
            .then(function (timeSlot) {
                main.setState({timeSlot: timeSlot, total: timeSlot.price}, function(){
                    facilityService.facilityById(main.state.timeSlot.facilityId)
                        .then(function (facility) {
                            main.setState({facility: facility}, function(){
                                main.setState({ isLoading: false});
                            });
                        });
                });
            });

        window.scrollTo(0, 0);
    }

    openModal() {
        let main = this;

        this.setState({modalIsOpen: true}, function () {
                setTimeout(function(){
                    window.location.href = "/facility?facilityId=" + main.state.timeSlot.facilityId;
                }, 2000)
            }
        );
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#000';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    updateEmailInputValue(email) {
        this.setState({
            emailInput: email,
            emailIsValid: true /*emailRegex({exact: true}).test(email) && email !== ""*/
        });
    }

    addInvite(){
        if(this.state.emailIsValid
            && this.state.inviteEmails.length < this.state.facility.facilityProfile.maxCapacity) {

            let list = this.state.inviteEmails;

            list.push(this.state.emailInput);

            this.setState({
                inviteEmails: list,
                emailInput: ""
            });
        }
    }

    removeInvite(email){
        var list = this.state.inviteEmails;

        var index = list.indexOf(email);
        if(index >= 0){
            list.splice(index, 1);
            this.setState({inviteEmails: list});
        }
    }

    toggleSupplementalEquipment(equipmentId){
        let list = this.state.selectedSupplementalEquipments;
        let equipment = this.state.facility.supplementalEquipments.filter(function( eq ) {
            return eq.id == equipmentId;
        })[0];

        let index = list.indexOf(equipment);
        if(index < 0) {
            list.push(equipment);

            this.setState({selectedSupplementalEquipments: list, total: this.state.total + equipment.price});
        }else{
            list.splice(index, 1);
            this.setState({selectedSupplementalEquipments: list, total: this.state.total - equipment.price});
        }
    }

    book(){
        this.setState({tryingToBook: true});

        let supplementalEquipmentIds = this.state.selectedSupplementalEquipments.map(eq => {
            return (
                eq.id
            );
        });

        let main = this;

        timeSlotService.bookTimeSlot(this.state.timeSlot.id, supplementalEquipmentIds, this.state.inviteEmails).then(function(data) {

            if(data !== null){
                main.setState({bookingMessage: "Booked with success!", tryingToBook: false, success: true}, main.openModal);
            } else{
                main.setState({bookingMessage: "Booking process failed. Please try again later.", tryingToBook: false, success: false}, main.openModal);
            }

        }).catch(function(error) {
            main.setState({bookingMessage: "Booking process failed. Please try again later.", tryingToBook: false, success: false}, main.openModal);
        });
    }

    render() {
        if(authService.currentUserInfo() === null){
            window.location.href = '/';
        }

        let emailItems = this.state.inviteEmails.map(email => {
            return (
                <li className="list-group-item" key={email}>
                    {email}
                    <button type="button" className="close" aria-label="Close" value={email} onClick={b => this.removeInvite(b.target.value)}>
                        &times;
                    </button>
                </li>
            );
        });

        let baseEquipments = [];
        if(this.state.facility.baseEquipments !== undefined){
            baseEquipments = this.state.facility.baseEquipments.map(eq => {
                return (
                    <li key={eq.id}>
                        {eq.name}
                    </li>
                );
            });
        }

        let supplementalEquipments = [];
        if(this.state.facility.supplementalEquipments !== undefined){
            supplementalEquipments = this.state.facility.supplementalEquipments.map(eq => {
                return (
                    <li className="list-group-item" key={eq.id}>
                        {eq.currentPromotion !== null?
                            <span>{eq.name}  - {eq.description} (<del>{Math.round(((eq.price * 100) / (100-eq.currentPromotion.discount)) * 100) / 100}€</del> <span className="text-warning font-weight-bold">{eq.price}€</span>)</span>
                            :
                            <span>{eq.name}  - {eq.description} ({eq.price}€)</span>
                        }
                        <button type="button" className="float-right" style={{background: "none", border: "none"}}>
                                <input type="checkbox" className="align-self-center" value={eq.id}
                                       onChange={c => this.toggleSupplementalEquipment(c.target.value)}
                                       aria-label="Checkbox to book the equipment"/>
                        </button>
                    </li>
                );
            });
        }

        let selectedSupplementalEquipments = this.state.selectedSupplementalEquipments.map(eq => {
            return (
                <div className="row" key={eq.id}>
                    <div className="col-9 text-left">
                        <h6>{eq.name}</h6>
                    </div>
                    <div className="col-3 text-right">
                        {eq.price} €
                    </div>
                </div>
            );
        });

        let tsBegin = moment(this.state.timeSlot.beginTime, "MM/DD/YYYY hh:mm:ss a");
        let tsEnd = moment(this.state.timeSlot.endTime, "MM/DD/YYYY hh:mm:ss a");
        let promotionBegin;
        let promotionEnd;
        let oldPrice = "";

        if(this.state.facility.promotionNext30Days) {
            promotionBegin = moment(this.state.facility.promotionNext30Days.beginTime, "MM/DD/YYYY hh:mm:ss a");
            promotionEnd = moment(this.state.facility.promotionNext30Days.endTime, "MM/DD/YYYY hh:mm:ss a");

            if(tsBegin.isSameOrAfter(promotionBegin) && tsBegin.isSameOrBefore(promotionEnd)){
                oldPrice = Math.round(((this.state.timeSlot.price * 100) /  (100-this.state.facility.promotionNext30Days.discount)) * 100) / 100;
            }
        }

        let valid = (this.state.emailIsValid)? "is-valid" : "is-invalid";

        return (
            (!this.state.isLoading) ?
                (<div className="page book-facility-page row" style={{paddingLeft: "10%", paddingRight: "10%"}}>
                    <div className="col-sm-7 text-left">
                        <div className="progress" style={{height: "30px", marginBottom: "16px"}}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: "33%"}}
                                 aria-valuenow="33" aria-valuemin="0" aria-valuemax="100">Choose date and time period
                            </div>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                                 role="progressbar" style={{width: "33%"}} aria-valuenow="66" aria-valuemin="0"
                                 aria-valuemax="100">Invite friends and select equipments
                            </div>
                            <div className="progress-bar bg-transparent" role="progressbar" style={{width: "34%"}}
                                 aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">Confirm and pay
                            </div>
                        </div>
                        <h3 className="book-facility-title"><b><Translate content="bookfacilitypage.title"/></b></h3>
                        <div>
                            <h6><b><Translate content="bookfacilitypage.invitefriends"/></b> <p className="text-muted">
                                (<Translate content="facilitypage.max_participants_allowed"/>: {this.state.facility.facilityProfile.maxCapacity})</p></h6>
                            <div className="input-group position-sticky">
                                <input type="text" className={"form-control " + valid}
                                       placeholder="Insert your friend's email"
                                       value={this.state.emailInput}
                                       onChange={evt => this.updateEmailInputValue(evt.target.value)}
                                       aria-label="Insert your friend's email" style={{borderRadius: "5px 0 0 0"}}/>
                                <span className="input-group-btn">
                                    <button className="btn btn-secondary" style={{borderRadius: "0 5px 0 0"}}
                                            onClick={this.addInvite} type="button">Add</button>
                                </span>
                            </div>
                            <ul className="list-group" style={{position: "relative"}}>
                                {emailItems}
                            </ul>
                        </div>
                        <hr className="hr-large"/>
                        <div>
                            <h5><b><Translate content="general.equipments"/></b></h5>
                            {this.state.facility.baseEquipments.length>0?
                                <div>
                                    <p>
                                        <Translate content="bookfacilitypage.equipmentsdescription"/>:</p>
                                    <ul>
                                        {baseEquipments}
                                    </ul>
                                    <h6><b>
                                        <Translate content="bookfacilitypage.supplementalequipmentsdescription"/>:
                                    </b></h6>
                                    <ul className="list-group" style={{position: "relative"}}>
                                        {supplementalEquipments}
                                    </ul>
                                </div>
                                : ""
                            }
                        </div>
                        <hr className="hr-large"/>
                        {tsBegin.dayOfYear() <= (moment().add(7, 'days')).dayOfYear()?
                            <div>
                                <Forecast latitude={this.state.facility.latitude} longitude={this.state.facility.longitude} name={this.state.facility.city.name} units='ca'/>
                            </div>
                            :
                            <div/>
                        }
                    </div>
                    <div className="col-sm-5">
                        <div className="col-price-information div-shadow">
                            <div className="row">
                                <div className="col-8 text-left">
                                    <h6 style={{wordWrap: "break-word"}}><b>{this.state.facility.name}</b></h6>
                                    <a className="text-muted">{this.state.facility.city.name}, {this.state.facility.city.district.country.name}</a>
                                    <RatingStars rating={this.state.facility.averageRating}/>
                                </div>
                                <div className="col-4" style={{margin: "0"}}>
                                    <img className="img-fluid rounded mx-auto d-block"
                                         src={this.state.facility.imageURL}/>
                                </div>
                            </div>
                            <hr/>
                            <div className="text-left">
                                <h6><b>{moment(this.state.timeSlot.beginTime, "MM/DD/YYYY").format("DD/MM/YYYY")}</b></h6>
                                <a>{moment(this.state.timeSlot.beginTime, "MM/DD/YYYY hh:mm:ss a").format("hh:mm:ss A")} - {moment(this.state.timeSlot.endTime, "MM/DD/YYYY hh:mm:ss a").format("hh:mm:ss A")}</a>
                            </div>
                            <hr/>
                            {oldPrice !== "" ?
                                <div className="row">
                                    <div className="col text-right">
                                        <del>{oldPrice} €</del>
                                    </div>
                                </div>
                                :
                                <div/>
                            }
                            <div className="row">
                                <div className="col-9 text-left">
                                    <h6>Time slot price</h6>
                                </div>
                                <div className="col-3 text-right">
                                    {this.state.timeSlot.price} €
                                </div>
                            </div>
                            {selectedSupplementalEquipments}
                            <hr/>
                            <div className="row">
                                <div className="col-9 text-left text-uppercase">
                                    <h6><b>Total</b></h6>
                                </div>
                                <div className="col-3 text-right">
                                    {this.state.total} €
                                </div>
                            </div>
                            <button type="button" className="btn btn-warning btn-lg btn-book" onClick={this.book}>Book</button>
                            {this.state.tryingToBook?
                                <div>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <div className="justify-content-center">
                                                <ReactLoading className="loading-spin-center-inside" type="spin" color="#F3C043" delay={0} height={30} width={30}/>
                                            </div>
                                            <a style={{marginTop: "50px"}}><b>{this.state.bookingMessage}</b></a>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div/>
                            }

                        </div>
                    </div>
                    <BookingResultMessage openModal={this.openModal} afterOpenModal={this.afterOpenModal}
                                          closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen}
                                          message={this.state.bookingMessage} image={this.state.success? success : failed}/>
                </div>)
                :
                (<ReactLoading type="spin" color="#F3C043" delay={0} className="loading-spin-center"/>)
        );
    }
}

export default BookFacilityPage;