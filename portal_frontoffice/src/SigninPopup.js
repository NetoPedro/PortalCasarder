import React, { Component } from 'react';
import AuthenticationService from "./service/auth/AuthenticationService";
import FacebookComponent from "./FacebookComponent";
import './SigninPopup.css';
import './bootstrap-social.css';
import Translate from "react-translate-component";

class SigninPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            rememberme: false,
            failed: false
        };

        this.signin = this.signin.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateUsernameInput = this.updateUsernameInput.bind(this);
        this.toggleRememberMe = this.toggleRememberMe.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    componentWillUpdate(){
        if(this.state.failed) {
            this.setState({failed: false});
        }
    }

    responseFacebook(response){
        let t = this;
        AuthenticationService.facebookUserSignin(response.accessToken, window.location.href)
            .then(function (response) {
                if(!response) {
                    t.setState({
                        failed: true
                    });
                } else{
                    window.location.replace(window.location.href);
                }
            });
    }

    updateUsernameInput(username) {
        this.setState({
            username: username
        });
    }

    updatePasswordInput(password) {
        this.setState({
            password: password
        });
    }

    toggleRememberMe() {
        this.setState({
            rememberme: !this.state.rememberme
        });
    }

    signin() {
        var t = this;
        AuthenticationService.userSignin(this.state.username, this.state.password, this.state.rememberme)
           .then(function (response) {
               if(response){
                   document.getElementById("signin-popup-close-btn").click();
                   window.location.reload();
               } else {
                   t.setState({
                       failed: true
                   });
               }
           });
    }

    render() {
        return (
            <div className="modal fade" id="signinmodal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">
                                <Translate
                                    content="signinmodal.title"
                                />
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form-signin">
                                <div className="form-group">
                                    <FacebookComponent responseFacebook={this.responseFacebook} redirectUri={window.location.href}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" id="inputEmail" className="form-control" placeholder="Username"
                                           required
                                           value={this.state.username} onChange={evt => this.updateUsernameInput(evt.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                           required
                                           value={this.state.password} onChange={evt => this.updatePasswordInput(evt.target.value)}/>
                                </div>
                                {this.state.failed? <label style={{color: "red"}}>
                                    <Translate
                                        content="signinmodal.errorMessage"
                                    />
                                </label> : ""}
                                <div className="form-check">
                                    <div className="checkbox">
                                        <label  className="form-check-label">
                                            <input type="checkbox" value="remember-me" className="form-check-input"
                                                   onChange={this.toggleRememberMe}/>
                                            <Translate
                                                content="signinmodal.rememberme"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="signin-popup-close-btn" type="button" className="btn btn-secondary" data-dismiss="modal">
                                <Translate
                                    content="general.close"
                                />
                            </button>
                            <button type="button" className="btn btn-warning" onClick={this.signin}>
                                <Translate content="signinmodal.title"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SigninPopup;