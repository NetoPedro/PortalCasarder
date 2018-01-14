import React, { Component } from 'react';
import queryString from 'query-string';
import {Link} from "react-router-dom";
import DatePicker from 'react-datepicker';
import moment from "moment";
import Helmet from 'react-helmet';
import $ from 'jquery';
import Translate from 'react-translate-component';
import ReactLoading from 'react-loading';
import facilityService from './service/facility-service';
import authService from './service/auth/AuthenticationService';

import RatingStars from "./RatingStars";
import CommentList from "./CommentSection";
import EquipmentsTable from "./EquipmentsTable";
import TimeSlotsTable from "./TimeSlotsTable";
import MapComponent from "./Map";


import './FacilityDetails.css';
import RatingsSection from "./RatingsSection";

class FacilityDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            facility: Object,
            date: moment(),
            month: moment().month(),
            availableDaysForSelectedMonth: [],
            availableTimeSlotsForSelectedDate: [],
            selectedTimeSlot: null
        };

        this.handleDateSelected = this.handleDateSelected.bind(this);
        this.handleTimeSlotSelected = this.handleTimeSlotSelected.bind(this);
        this.getAvailableDays = this.getAvailableDays.bind(this);
        this.getAvailableTimeSlots = this.getAvailableTimeSlots.bind(this);
        this.openTimeSlotDropdown = this.openTimeSlotDropdown.bind(this);

        this.props.changeNavbar("white");
    }

    componentWillMount() {
        //const parsed = queryString.parse(this.props.location.search);

        let id = new URL(window.location.href).searchParams.get("facilityId");
        if(!id) return;

        let main = this;
        facilityService.facilityById(id)
            .then(function (facility) {

                if(facility !== undefined) {
                    main.setState({facility: facility}, function () {

                        /*
                        $("meta[property='og\\:title']").attr("content", main.state.facility.name);
                        $("meta[property='og\\:description']").attr("content", main.state.facility.description);
                        $("meta[property='og\\:image']").attr("content", main.state.facility.imageURL);
                        $("meta[property='og\\:url']").attr("content", window.location.href);
                        */


                        main.getAvailableTimeSlots(main.state.date, false);

                        main.getAvailableDays((main.state.month + 1));
                        main.setState({isLoading: false});
                    });
                } else{
                    setTimeout(function() {
                        main.componentWillMount();
                    }, 3000);
                }
            });

        window.scrollTo(0, 0);
    }

    openTimeSlotDropdown(){
        this.tsDropdown.click();
    }

    getAvailableDays(month){

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        fetch('https://casarder.azurewebsites.net/pt/api/facilities/' + this.state.facility.id + '/MonthAvailableDays?month=' + month,
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                main.setState(
                    {
                        availableDaysForSelectedMonth: data
                    }
                );

            }).catch(function(error) {
                console.log(error);
            }
        );
    }

    getAvailableTimeSlots(date, openDropdown){

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        fetch('https://casarder.azurewebsites.net/pt/api/timeslots?facilityId=' + this.state.facility.id + '&availableOn=' + moment(date).format('YYYY-MM-DD'),
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                main.setState(
                    {
                        availableTimeSlotsForSelectedDate: data
                    }
                , function(){
                        if(openDropdown){
                            main.tsDropdown.click()
                        }
                    });


            }).catch(function(error) {
                console.log(error);
            }
        );
    }

    handleDateSelected(date){
        let main = this;
        this.setState({ date: date, selectedTimeSlot: null }, function() {
            main.getAvailableTimeSlots(main.state.date, true);
        });
    }

    handleTimeSlotSelected(ts){
        this.setState({ selectedTimeSlot: ts });
    }

    render() {

        let ratingsDescription;
        let availableDays;
        let images = [];
        let carrouselIndicators = [];
        let features = "";
        let sports = "";

        if(!this.isLoading) {
            switch (this.state.facility.averageRating | 0) {
                case 0:
                    ratingsDescription =<Translate content="facilityDetails.ratingsEvaluation.ratingsNoEvaluation"/>;
                    break;
                case 1:
                    ratingsDescription =<Translate content="facilityDetails.ratingsEvaluation.ratingsVeryBad"/>;
                    break;
                case 2:
                    ratingsDescription =<Translate content="facilityDetails.ratingsEvaluation.ratingsBad"/>;
                    break;
                case 3:
                    ratingsDescription =<Translate content="facilityDetails.ratingsEvaluation.ratingsGood"/>;
                    break;
                case 4:
                    ratingsDescription =<Translate content="facilityDetails.ratingsEvaluation.ratingsVeryGood"/>;
                    break;
                case 5:
                    ratingsDescription =<Translate content="facilityDetails.ratingsEvaluation.ratingsExcelent"/>;
                    break;
                default:
                    ratingsDescription =<Translate content="facilityDetails.ratingsEvaluation.ratingsNoEvaluation"/>;
                    break;
            }

            availableDays = this.state.availableDaysForSelectedMonth.map((day) => {
                return moment().date(day);
            });

            if(this.state.facility.otherImagesURL !== undefined) {
                images = this.state.facility.otherImagesURL.map((image) => {
                    return (
                        <div className="carousel-item carousel-item-custom" key={image}>
                            <img className="w-100 img-responsive"
                                 src={image}/>
                        </div>)
                });

                let i = 0;
                carrouselIndicators = this.state.facility.otherImagesURL.map((image) => {
                    i++;
                    return (
                        <li data-target="#carouselExampleIndicators" data-slide-to={i} key={i}/>
                    )
                });

                for(i = 0; i < this.state.facility.categories.length; i++){
                    features += i===0? this.state.facility.categories[i].name : " | " + this.state.facility.categories[i].name;
                }

                for(i = 0; i < this.state.facility.sports.length; i++){
                    sports += i===0? this.state.facility.sports[i].name : " | " + this.state.facility.sports[i].name;
                }
            }
        }

        /*
        var disableDays = [];

        var i;
        for(i = 0; i < moment().daysInMonth(); i++){
            disableDays.push(moment().date(i+1));
        }

        for(i = 0; i < this.state.availableDaysForSelectedMonth.length; i++){
            var index = this.state.availableDaysForSelectedMonth[i]-1;
            if (index >= 0) {
                disableDays.splice(index, 1);
            }
        }

        let baseEquipments = this.state.baseEquipments.map((eq) => {
            return (
                <a className="dropdown-item" key={eq.id}>{eq.name}</a>
            )
        });

        let supplementalEquipments = this.state.supplementalEquipments.map((eq) => {
            return (
                <a className="dropdown-item" key={eq.id}>{eq.name} - Price: {eq.price}€</a>
            )
        });



        var dropdownBaseEquipments = (baseEquipments.length === 0)?
            <a className="dropdown-item" href="#">No base equipments</a>
            : baseEquipments;

        var dropdownSupplementalEquipments = (supplementalEquipments.length === 0)?
            <a className="dropdown-item" href="#">No supplemental equipments</a>
            : supplementalEquipments;
         */


        let timeslots = this.state.availableTimeSlotsForSelectedDate.map((ts) => {
            let begin = moment(ts.beginTime, "MM/DD/YYYY hh:mm:ss a");
            let end = moment(ts.endTime, "MM/DD/YYYY hh:mm:ss a");

            return (
                <a className="dropdown-item" key={ts.id} onClick={a => this.handleTimeSlotSelected(ts)}>
                    {begin.hour() + ":" + begin.minute() + " - " + end.hour() + ":" + end.minute()}
                </a>
            )
        });

        let dropdownTimeslots = (timeslots.length === 0)?
            <a className="dropdown-item disabled text-muted">No time period for the selected date</a>
            : timeslots;


        let tsBegin = moment();
        let tsEnd = moment();
        let dropDownTimeSlotsLabel;
        if(this.state.selectedTimeSlot !== null){
            tsBegin = moment(this.state.selectedTimeSlot.beginTime, "MM/DD/YYYY hh:mm:ss a");
            tsEnd = moment(this.state.selectedTimeSlot.endTime, "MM/DD/YYYY hh:mm:ss a");
            dropDownTimeSlotsLabel = tsBegin.hour() + ":" + tsBegin.minute() + " - " + tsEnd.hour() + ":" + tsEnd.minute();
        }else {
            dropDownTimeSlotsLabel = "Time period";
        }

        let labelPromotion = <div/>;
        let promotionBegin;
        let promotionEnd;
        let oldPrice = "";

        if(this.state.facility.promotionNext30Days) {
            promotionBegin = moment(this.state.facility.promotionNext30Days.beginTime, "MM/DD/YYYY hh:mm:ss a");
            promotionEnd = moment(this.state.facility.promotionNext30Days.endTime, "MM/DD/YYYY hh:mm:ss a");

            labelPromotion = <div className="bg-warning text-white w-100 h5 div-shadow" style={{paddingTop: "5px",paddingBottom: "5px"}}>
                {this.state.facility.promotionNext30Days.discount}% Desconto de {promotionBegin.format("DD/MM")} a {promotionEnd.format("DD/MM")}
                </div>;

            if(this.state.selectedTimeSlot !== null && tsBegin.isSameOrAfter(promotionBegin) && tsBegin.isSameOrBefore(promotionEnd)){
                oldPrice = Math.round(((this.state.selectedTimeSlot.price * 100) / (100-this.state.facility.promotionNext30Days.discount)) * 100) / 100;
            }
        }

        return (
            !this.state.isLoading?
            <div style={{margin: "54px 0 32px 0", padding: "0px"}}>
                <Helmet meta={[
                    { property: 'og:title', content: this.state.facility.name },
                    { property: 'og:url', content: window.location.href },
                    { property: 'og:description', content: this.state.facility.description },
                    { property: 'og:image', content: this.state.facility.imageURL }
                ]}>
                    <title>{this.state.facility.name}</title>
                </Helmet>
                <header>
                    <div id="carouselExampleIndicators" className="carousel" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
                            {carrouselIndicators}
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item carousel-item-custom active">
                                <img className="w-100 img-responsive" src={this.state.facility.imageURL} alt="First slide"/>
                            </div>
                            {images}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                    {labelPromotion}
                </header>
                <div className="facility-details-page">
                    <div className="facility-details-content">
                        <div className="row">
                            <div className="col-md-8 text-left">
                                <div className="row justify-content-start">
                                    <div className="col">
                                        <iframe src={"https://www.facebook.com/plugins/share_button.php?href=" + encodeURIComponent(window.location.href) + "&layout=button_count&size=large&mobile_iframe=true&appId=913486285495078&width=106&height=28"} style={{border:"none",overflow:"hidden", height: "28px", width: "106px"}} scrolling="no" frameBorder="0" allowTransparency="true"/>
                                        <iframe
                                            src={"https://platform.twitter.com/widgets/tweet_button.html?size=l&url=" + encodeURIComponent(window.location.href) + "&text=Diga%20algo%20sobre%20este%20recinto&hashtags=casarder%2Carmisgroup"}
                                            width="140"
                                            height="28"
                                            title="Twitter Tweet Button"
                                            style={{border: "0", overflow: "hidden"}}/>
                                    </div>
                                </div>
                                <div className="row facility-details-title" style={{marginLeft: "0", marginRight: "0"}}>
                                    <div className="col-lg-8 text-left" style={{padding: "0px"}}>
                                        <a className="font-weight-bold facility-name">{this.state.facility.name}</a>
                                        <div className="row" style={{margin: "0"}}>
                                            <a>{this.state.facility.city.name}, {this.state.facility.city.district.country.name}</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 text-right">
                                        <RatingStars rating={this.state.facility.averageRating}/>
                                        <a>{this.state.facility.ratingsCounter} <Translate content="general.ratings"/></a>
                                        <a> | </a>
                                        <a>{ratingsDescription}</a>
                                    </div>
                                </div>
                                <hr/>
                                <div className="row" style={{margin: "0"}}>
                                    <p className="facility-features">{features}</p>
                                </div>
                                <div className="row" style={{margin: "0"}}>
                                    <p className="facility-features">{sports}</p>
                                </div>
                                <p className="facility-details-description" style={{wordWrap: "break-word"}}>{this.state.facility.description}</p>
                                <hr/>
                                <div>
                                    <h6><b><Translate content="general.participants"/></b></h6>
                                    <p><Translate content="facilitypage.max_participants_allowed"/>: {this.state.facility.facilityProfile.maxCapacity}</p>
                                </div>
                                <hr/>
                                <div className="row" style={{margin: "8px 0 0 0"}}>
                                    <div className="col-sm-6">
                                        <EquipmentsTable equipments={this.state.facility.baseEquipments} hasPrice={false}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <EquipmentsTable equipments={this.state.facility.supplementalEquipments} hasPrice={true}/>
                                    </div>
                                </div>
                                <hr/>
                                <RatingsSection accessesRating={this.state.facility.averageAccessesRating}
                                                premisesRating={this.state.facility.averagePremisesRating}
                                                priceRating={this.state.facility.averagePriceRating}
                                                averageRating={this.state.facility.averageRating}
                                                ratingsCounter={this.state.facility.ratingsCounter}
                                />
                                <hr/>
                                <CommentList facilityId={this.state.facility.id}/>
                            </div>
                            <div className="col-md-4">
                                <div className="col-book text-left div-shadow">
                                    <div style={{marginBottom: "10px"}}>
                                        <div className="text-capitalize font-weight-light">Date</div>
                                        <DatePicker
                                            className="date-picker-button font-weight-light"
                                            withPortal
                                            dateFormat="DD/MM/YYYY"
                                            popperModifiers={{
                                                offset: {
                                                    enabled: true,
                                                    offset: '5px, 10px'
                                                },
                                                preventOverflow: {
                                                    enabled: true,
                                                    escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                                                    boundariesElement: 'viewport'
                                                }
                                            }}
                                            highlightDates={[{"highlighted-dates": availableDays}]}
                                            selected={this.state.date}
                                            showMonthDropdown
                                            onChange={this.handleDateSelected}
                                        >
                                            <div className="text-warning font-weight-bold text-center">The available dates are highlighted in yellow.</div>
                                        </DatePicker>
                                    </div>
                                    <div style={{marginBottom: "10px"}}>
                                        <div className="text-capitalize font-weight-light">Time period</div>
                                        <div className="dropdown">
                                            <button className="btn dropdown-toggle font-weight-light time-slots-dropdown"
                                                    type="button" id="timeslotsDropdown" data-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="false"
                                                    ref={ tsDropdown => this.tsDropdown = tsDropdown}>
                                                {dropDownTimeSlotsLabel}
                                            </button>
                                            <div className="dropdown-menu font-weight-light" aria-labelledby="timeslotsDropdown">
                                                {dropdownTimeslots}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        this.state.selectedTimeSlot !== null ?
                                                 <div>
                                                     <hr/>
                                                     {oldPrice !== "" ?
                                                         <div className="row">
                                                             <div className="col text-right ">
                                                                 <del>{oldPrice} €</del>
                                                             </div>
                                                         </div>
                                                          :
                                                         <div/>
                                                     }
                                                     <div className="row" style={{marginBottom: "10px"}}>
                                                         <div className="col-7 text-left">
                                                             <h6 className="font-weight-light">Price</h6>
                                                         </div>
                                                         <div className="col-5 text-right">
                                                             {this.state.selectedTimeSlot.price} €
                                                         </div>
                                                     </div>
                                                     {authService.loggedUser() ?
                                                         <Link to={{
                                                             pathname: '/book',
                                                             search: '?timeSlotId=' + this.state.selectedTimeSlot.id
                                                         }}
                                                               className="btn btn-warning btn-lg btn-book"><Translate
                                                             content="general.book"/></Link>
                                                         :
                                                         <button type="button"
                                                                 className="btn btn-warning btn-lg btn-book"
                                                                 data-toggle="modal" data-target="#signinmodal">
                                                             <Translate content="general.book"/>
                                                         </button>
                                                     }
                                                 </div>
                                        :
                                        <button type="button" className="btn btn-warning btn-lg btn-book" onClick={this.openTimeSlotDropdown}>
                                            <Translate content="general.book"/>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <MapComponent lat={this.state.facility.latitude} lng={this.state.facility.longitude} goToCurrentLocation={false}/>
                </div>
            </div>
                : (<ReactLoading type="spin" color="#F3C043" delay={500} className="loading-spin-center"/>)
        );
    }
}

export default FacilityDetails;