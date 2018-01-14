import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import Footer from "./Footer";
import SigninPopup from "./SigninPopup";
import FacilityDetails from "./FacilityDetails";
import BookFacilityPage from "./BookFacilityPage";
import MyBookingsPage from "./MyBookingsPage";
import SignupPopup from "./SignupPopup";
import ProfilePage from "./ProfilePage";
import TermsAndConditions from "./TermsAndConditions";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navbarStyle: "transparent",
        };

        this.changeNavbar = this.changeNavbar.bind(this);
    }


    changeNavbar(style){
        this.setState({
            navbarStyle: style
        });
    }

    render() {
        return (
            <div className="App">
                <Navbar style={this.state.navbarStyle}/>
                <Switch>
                    <Route exact path='/' render={(props) => <HomePage {...props} changeNavbar={this.changeNavbar}/>}/>
                    <Route path='/search' render={(props) => <SearchPage {...props} changeNavbar={this.changeNavbar}/>}/>
                    <Route path='/facility' render={(props) => <FacilityDetails {...props} changeNavbar={this.changeNavbar}/>}/>
                    <Route path='/book' render={(props) => <BookFacilityPage {...props} changeNavbar={this.changeNavbar}/>}/>
                    <Route path='/mybookings' render={(props) => <MyBookingsPage {...props} changeNavbar={this.changeNavbar}/>}/>
                    <Route path='/profile' render={(props) => <ProfilePage {...props} changeNavbar={this.changeNavbar}/>}/>
                    <Route path='/termsconditions' render={(props) => <TermsAndConditions {...props} changeNavbar={this.changeNavbar}/>}/>
                </Switch>
                <Footer/>
                <SigninPopup/>
                <SignupPopup/>
            </div>
        );
    }
}

export default App;