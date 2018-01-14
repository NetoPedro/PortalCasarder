import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './App.css';
import './bootstrap-social.css';

class FacebookComponent extends Component {
    render(){
        return (
            <FacebookLogin
                appId="913486285495078"
                autoLoad={false}
                fields="name,email"
                scope="public_profile,email"
                cssClass="btn btn-block btn-social btn-facebook"
                callback={this.props.responseFacebook}
                redirectUri={this.props.redirectUri}
                size="small"
                icon={<span className="fa fa-facebook"/>}
            />
        );
    }

}

export default FacebookComponent;