import React, { Component } from 'react';
import Translate from 'react-translate-component';
import RatingStars from "./RatingStars";

class RatingsSection extends Component {
    render() {

        return (
            <div>
                <div className="row" style={{marginTop: "30px"}}>
                    <div className="container">
                        <h4 className="d-inline-block"><b>{this.props.ratingsCounter} <Translate content="general.ratings"/></b></h4>
                        <div className="d-inline-block" style={{marginLeft: "10px"}}>
                            <h4><RatingStars rating={this.props.averageRating}/></h4>
                        </div>
                    </div>
                </div>
                <div className="container" style={{padding: "0"}}>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <Translate content="general.price"/>
                            </div>
                            <div className="col text-right">
                                <RatingStars rating={this.props.priceRating}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Translate content="general.accesses"/>
                            </div>
                            <div className="col text-right">
                                <RatingStars rating={this.props.accessesRating}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Translate content="general.premises"/>
                            </div>
                            <div className="col text-right">
                                <RatingStars rating={this.props.premisesRating}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RatingsSection;