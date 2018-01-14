import React, { Component } from 'react';
import './HomePage.css';
import ReactLoading from 'react-loading';
import FeaturedFacilityCard from "./FeaturedFacilityCard";
import Translate from "react-translate-component";

class FeaturedFacilities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            facilities: [],
            isLoading: true
        };

        this.search = this.search.bind(this);

        this.search();
    }

    search() {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        fetch('https://casarder.azurewebsites.net/pt/api/facilities?sortBy=rating&limit=5',
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => response.json())
            .then(function (data) {

                main.setState({facilities: data.facilitiesDTO, isLoading: false});

                window.scrollTo(0,0);

                return data;

            }).catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            !this.state.isLoading && this.state.facilities.length > 0 ?
            <div className="Featured-facilities text-uppercase">
                <div className="col-4 offset-4">
                    <h3 className="h3">
                        <Translate
                            content="homepage.featured_facilities.title"
                        />
                    </h3>
                    <hr style={{width: "50%", borderTop: "2px solid #FFC107", marginTop: "0", marginBottom: "40px"}}/>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <FeaturedFacilityCard facility={this.state.facilities[0]} key={this.state.facilities[0].id}/>
                    </div>
                    <div className="col-sm-6">
                        <FeaturedFacilityCard facility={this.state.facilities[1]} key={this.state.facilities[1].id}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <FeaturedFacilityCard facility={this.state.facilities[2]} key={this.state.facilities[2].id}/>
                    </div>
                    <div className="col-sm-4">
                        <FeaturedFacilityCard facility={this.state.facilities[3]} key={this.state.facilities[3].id}/>
                    </div>
                    <div className="col-sm-4">
                        <FeaturedFacilityCard facility={this.state.facilities[4]} key={this.state.facilities[4].id}/>
                    </div>
                </div>
            </div>
                : (<ReactLoading type="spin" color="#F3C043" delay={1000} className="loading-spin-center-inside"/>)
        );
    }
}

export default FeaturedFacilities;
