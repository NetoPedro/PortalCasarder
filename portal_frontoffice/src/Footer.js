import React, { Component } from 'react';
import './Footer.css';
import {Link} from "react-router-dom";
import Translate from 'react-translate-component';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="text-left" style={{height: "inherit"}}>
                    <div className="d-inline-block font-weight-light col-auto">
                        <a href="http://www.armisdigitalsport.com/#/contacts" style={{color: "white"}}>
                            <Translate content="footer.contacts" />
                        </a>
                    </div>
                    <div className="d-inline-block font-weight-light col-auto">
                        <a href="http://www.armisdigitalsport.com/" style={{color: "white"}}>
                            <Translate content="footer.about" />
                        </a>
                    </div>
                    <Link to={{ pathname: '/termsconditions'}}>
                        <a className="d-inline-block font-weight-light col-auto" style={{color: "white"}}>
                            <Translate content="footer.terms" />
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Footer;
