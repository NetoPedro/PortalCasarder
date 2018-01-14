import React, { Component } from 'react';
import image from './img/hp_header.jpg';
import {Link} from "react-router-dom";

class FeaturedLocationCard extends Component {
    render() {
        return (
            <div style={{marginBottom: "20px"}}>
                <Link to={{ pathname: '/facility', search: '?facilityId=' + this.props.facility.id}}>
                    <img className="img-fluid d-inline-block" src={image} alt="Card"/>
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

export default FeaturedLocationCard;
