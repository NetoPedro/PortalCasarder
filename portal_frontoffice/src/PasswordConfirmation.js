import React, { Component } from 'react';
import './SigninPopup.css';
import AuthenticationService from "./service/auth/AuthenticationService";
import FacebookComponent from "./FacebookComponent";
import success from './img/success.png';
import Translate from "react-translate-component";

class PasswordConfirmation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: ''
        };

        this.confirm = this.confirm.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
    }

    confirm() {
        document.getElementById("confirm-password-close-btn").click();
        this.props.callback(this.state.password);
    }

    updatePasswordInput(password) {
        this.setState({
            password: password
        });
    }

    render() {
        return (
            <div className="modal fade" id="confirmpassword" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">
                                <Translate content="passwordconfirmation.confirmAction"/>
                            </h5>
                            <button type="button" id="confirm-password-close-btn" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <Translate content="passwordconfirmation.enterPassword"/>
                            </p>
                            <div className="form-group">
                                <input type="password" id="confirmPasswordInput" className="form-control" placeholder="Password"
                                       required
                                       value={this.state.password} onChange={evt => this.updatePasswordInput(evt.target.value)}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" onClick={this.confirm}>
                                <Translate content="passwordconfirmation.confirm"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PasswordConfirmation;