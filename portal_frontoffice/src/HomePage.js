import React, { Component } from 'react';
import $ from 'jquery';
import HomePageHeader from "./HomePageHeader";
import FeaturedFacilities from "./FeaturedFacilities";
import FeaturedLocations from "./FeaturedLocations";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);

        this.props.changeNavbar("transparent");
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(){
        let main = this;

        var scroll_start = 0;
        scroll_start = $(document).scrollTop();

        if (scroll_start < 100 && scroll_start >= 0){
            main.props.changeNavbar("transparent");
        } else {
            main.props.changeNavbar("white");
        }
    }

    render() {
        return (
            <div style={{height: "100%", minHeight: "95vh"}}>
                <HomePageHeader/>
                <FeaturedFacilities/>
            </div>
        );
    }
}

export default HomePage;