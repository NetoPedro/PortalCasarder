import React, { Component } from 'react';
import './HomePage.css';
import Translate from "react-translate-component";
import FeaturedLocationCard from "./FeaturedLocationCard";
import facilityService from './service/facility-service';

class FeaturedLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };

        this.search = this.search.bind(this);

        this.search();
    }

    search() {
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        facilityService.searchTop3LocationsWithSolr().then((data) => {
            main.setState({locations: data.response.docs});
        });
    }

    render() {
        return (
            this.state.locations.length > 0 &&
            <div className="Featured-facilities text-uppercase">
                <div className="col-4 offset-4">
                    <h3 className="h3">
                        <Translate
                            content="homepage.featured_locations.title"
                        />
                    </h3>
                    <hr style={{width: "50%", borderTop: "2px solid #FFC107", marginTop: "0", marginBottom: "40px"}}/>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <FeaturedLocationCard facility={this.state.locations[0]} key={this.state.locations[0].id}/>
                    </div>
                    <div className="col-sm-6">
                        <div className="row col">
                            <FeaturedLocationCard facility={this.state.locations[1]} key={this.state.locations[1].id}/>
                        </div>
                        <div className="row col">
                            <FeaturedLocationCard facility={this.state.locations[2]} key={this.state.locations[2].id}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeaturedLocations;
