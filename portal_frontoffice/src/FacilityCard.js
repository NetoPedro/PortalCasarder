import React, { Component } from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import $ from 'jquery';
import counterPart from 'counterpart';
import RatingStars from "./RatingStars";
import './FacilityCard.css';
import Translate from 'react-translate-component';


class FacilityCard extends Component {

    render() {

        let ratingsDescription;

        switch(this.props.facility.averageRating | 0){
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
                ratingsDescription =  <Translate content="facilityDetails.ratingsEvaluation.ratingsGood"/>;
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

        let labelPromotion = <div/>;

        if(this.props.facility.promotion) {
            let begin = moment(this.props.facility.promotion.split('|')[1], "DD/MM/YYYY hh:mm:ss a");
            let end = moment(this.props.facility.promotion.split('|')[2], "DD/MM/YYYY hh:mm:ss a");

            labelPromotion = <div className="facility-promotion-label">-{this.props.facility.promotion.split('|')[0]}%
                de {begin.format("DD/MM")} a {end.format("DD/MM")}</div>;
        }

        let description =  this.props.facility.description;
        let xmlDoc, parser;

        if (window.DOMParser)
        {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(description, "text/html");

            if(xmlDoc.getElementsByTagName(counterPart.getLocale())[0] !== undefined){
                description = xmlDoc.getElementsByTagName(counterPart.getLocale())[0].childNodes[0].nodeValue;
            } else{
                description = xmlDoc.getElementsByTagName('pt')[0].childNodes[0].nodeValue;
            }
        }



        return (

            <div className="container-fluid div-shadow-navbar">
                <div className="facility-card row">
                    <div className="col-md-4" style={{padding: "0px"}}>
                        <img src={this.props.facility.imageURL} alt="Card" className="facility-image img-responsive"/>
                        {labelPromotion}
                    </div>
                    <div className="facility-details col-md-8">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 text-left" style={{padding: "0px"}}>
                                    <a className="font-weight-bold text-uppercase">{this.props.facility.name}</a>
                                </div>
                                <div className="col-lg-4 text-right" style={{padding: "0px"}}>
                                    <div className="ratings">
                                        <RatingStars rating={this.props.facility.averageRating-0.01}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row text-center">
                                <div>
                                    <small className="text-uppercase">{this.props.facility.city}</small>
                                </div>
                                <div className="ratings">
                                    <small>{ratingsDescription}</small>
                                    <small> | </small>
                                    <small>{this.props.facility.ratingsCounter}</small>
                                </div>
                            </div>
                            <div className="row">
                                <small className="facility-features">{this.props.featuresTags}</small>
                            </div>
                            <div className="row">
                                <h4 className="facility-description">{description}</h4>
                            </div>
                            <div className="row justify-content-end">
                                <Link to={{ pathname: '/facility', search: '?facilityId=' + this.props.facility.id}} className="btn btn-warning btn-warning-custom">
                                    <Translate
                                     content="searchpage.facilityMoreInformation"
                                    />
                                </Link>
                                {/*<button type="button" className="btn btn-warning btn-warning-custom" onClick={this.props.seeDetails.bind(this, this.props.index)}>More</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FacilityCard;
