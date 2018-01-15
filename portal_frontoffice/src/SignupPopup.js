import React, { Component } from 'react';
import './SigninPopup.css';
import AuthenticationService from "./service/auth/AuthenticationService";
import FacebookComponent from "./FacebookComponent";
import success from './img/success.png';
import Translate from "react-translate-component";

class SignupPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatedPassword: '',
            email: '',
            passwordsDoNotMatch: false,
            passwordIsWeak: false,
            success: false,
            acceptedTerms: false
        };

        this.signup = this.signup.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateRepeatedPasswordInput = this.updateRepeatedPasswordInput.bind(this);
        this.updateUsernameInput = this.updateUsernameInput.bind(this);
        this.updateEmailInput = this.updateEmailInput.bind(this);
        this.responseFacebook = this.responseFacebook.bind(this);
        this.acceptTerms = this.acceptTerms.bind(this);
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

    updateEmailInput(email) {
        this.setState({
            email: email
        });
    }

    updatePasswordInput(password) {
        this.setState({
            password: password
        });
    }

    updateRepeatedPasswordInput(password) {
        this.setState({
            repeatedPassword: password
        });
    }

    signup() {
        if(this.state.password !== this.state.repeatedPassword){
            this.setState({passwordsDoNotMatch: true, passwordIsWeak: false});
            return;
        }

        if(this.state.password.length < 6){
            this.setState({passwordsDoNotMatch: false, passwordIsWeak: true});
            return;
        }

        let t = this;
        AuthenticationService.userSignup(this.state.username, this.state.password, this.state.email)
            .then(function (response) {
                if(response){


                    t.setState({
                        success: true
                    });
                    setTimeout(() => {
                        window.location.reload();}, 1000);

                } else {
                    t.setState({
                        success: false
                    });
                }
            });
    }

    acceptTerms(){
        if(this.state.acceptedTerms) {
            this.setState({acceptedTerms: false});
        } else {
            this.setState({acceptedTerms: true});
        }
    }

    render() {
        if(this.state.success) return (<div className="modal fade" id="signupmodal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modalLabel"><Translate content="signupmodal.success" /></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>);

        return (
            <div className="modal fade" id="signupmodal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel"><Translate content="signupmodal.title" /></h5>
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
                                    <input type="text" id="inputUsername" className="form-control" placeholder="Username"
                                           required
                                           value={this.state.username} onChange={evt => this.updateUsernameInput(evt.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input type="email" id="signUpInputEmail"
                                           className={"form-control "/* + (emailRegex({exact: true}).test(this.state.email) && this.state.email.length > 0? "is-valid" : "is-invalid")*/}
                                           placeholder="Email" required
                                           value={this.state.email} onChange={evt => this.updateEmailInput(evt.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" id="signUpInputPassword" className="form-control" placeholder="Password"
                                           required
                                           value={this.state.password} onChange={evt => this.updatePasswordInput(evt.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input type="password" id="signUpInputRepeatedPassword" className="form-control" placeholder="Repeat password"
                                           required
                                           value={this.state.repeatedPassword} onChange={evt => this.updateRepeatedPasswordInput(evt.target.value)}/>
                                </div>
                                <div className="col text-danger">
                                    {this.state.passwordsDoNotMatch && <Translate content="signupmodal.passwordsDoNotMatch" />}
                                    {this.state.passwordIsWeak && <Translate content="signupmodal.passwordNotAccepted" />}
                                </div>
                                <div className="form-check">
                                    <div className="checkbox">
                                        <label  className="form-check-label">
                                            <input type="checkbox" className="form-check-input" value={this.state.acceptedTerms}
                                                onChange={this.acceptTerms}/> <Translate content="signupmodal.readandaccept" /> <a href="/termsconditions"><Translate content="footer.terms" /></a>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button id="signup-popup-close-btn" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {this.state.acceptedTerms ?
                                <button type="button" className="btn btn-warning" onClick={this.signup}>Sign up</button>
                                :
                                <button type="button" disabled={true} className="btn btn-warning" onClick={this.signup}>Sign up</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupPopup;