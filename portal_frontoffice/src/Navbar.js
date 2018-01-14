import React, { Component } from 'react';
import './Navbar.css';
import {Link} from "react-router-dom";
import AuthenticationService from "./service/auth/AuthenticationService";
import LocaleSwitcher from "./LocaleSwitcher";
import Translate from 'react-translate-component';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        AuthenticationService.logout();
        window.location.reload();
        this.forceUpdate();
    }

    render() {
        let background;
        let textColor;
        let brandColor;
        let shadow;

        if(this.props.style === "transparent"){
            background = "navbar-custom-transparent";
            textColor = "btn-link-white";
            brandColor = "navbar-brand-white";
            shadow =  "";
        }else if(this.props.style === "white"){
            background = "navbar-custom-white";
            textColor = "btn-link-black";
            brandColor = "navbar-brand-black";
            shadow = "div-shadow-navbar";
        }

        let username = AuthenticationService.loggedUser();
        let rightSide = (!username)?
            <div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span><i className="fa fa-bars" style={{color: "#FFC107"}} aria-hidden="true"/></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ml-auto">
                        <li>
                            <div className="btn-group" data-toggle="buttons">
                                <button type="button" className={"btn btn-link "+ textColor} data-toggle="modal" data-target="#signinmodal">
                                    <Translate content="navbar.login" />
                                </button>
                                <span className="btn-separator"/>
                                <button type="button" className="btn btn-link btn-link-yellow font-weight-bold"
                                        data-toggle="modal" data-target="#signupmodal">
                                    <Translate content="navbar.signup" />
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            :
            <div>
                <div className="btn-group">
                    <button type="button" className={"btn btn-dropdown-toggle dropdown-toggle dropdown-toggle-navbar " + textColor}
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {username}
                    </button>
                    <div className="dropdown-menu dropdown-menu-navbar">
                        <Link to={{ pathname: '/mybookings'}}><a className="dropdown-item btn">
                            <Translate content="navbar.mybookings" />
                        </a></Link>
                        <Link to={{ pathname: '/profile'}}><a className="dropdown-item btn">
                            <Translate content="general.profile" />
                        </a></Link>
                        <div className="dropdown-divider"/>
                        <a className="dropdown-item btn text-white bg-danger text-center" onClick={this.handleLogout}>
                            <Translate content="navbar.logout" />
                        </a>
                    </div>
                </div>
            </div>;

        return (
            <div id="navbar">
                <nav className={"navbar navbar-expand-lg navbar-light bg-light justify-content-between fixed-top " + background + " " + shadow}>
                    <div className="navbar-header">
                        <Link to={{ pathname: '/'}} className={brandColor + " font-weight-bold"}>Casarder</Link>
                    </div>
                    <div className="form-inline">
                        {rightSide}
                        <LocaleSwitcher/>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;
