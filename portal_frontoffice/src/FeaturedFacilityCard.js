import React, { Component } from 'react';
import {Link} from "react-router-dom";

class FeaturedFacilityCard extends Component {
    render() {
        return (
            <div style={{marginBottom: "20px"}}>
                <Link to={{ pathname: '/facility', search: '?facilityId=' + this.props.facility.id}}>
                    <img className="card-img-top" src={this.props.facility.imageURL} alt="Card" style={{marginBottom: "8px"}}/>
                </Link>
                <div className="text-left">
                    <Link to={{ pathname: '/facility', search: '?facilityId=' + this.props.facility.id}}>
                        <div className="text-uppercase font-weight-bold btn-link-black">{this.props.facility.name}</div>
                    </Link>
                    <small className="text-uppercase font-weight-light">{this.props.facility.locality}</small>
                </div>
            </div>
        );
    }
}

export default FeaturedFacilityCard;
