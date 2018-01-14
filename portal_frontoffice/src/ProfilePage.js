import React, {Component} from 'react';
import authService from './service/auth/AuthenticationService';
import ReactConfirmAlert from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PasswordConfirmation from "./PasswordConfirmation";
import Translate from "react-translate-component";

class ProfilePage extends Component {

    constructor(props) {
        super(props);

        let info = authService.currentUserInfo();
        if(info === null) window.location.href = '/';

        this.state = {
            editing: false,
            currentUserInfo: info,
            newUsername: info.username,
            newEmail: info.email,
            newPassword: '',
            repeatNewPassword: '',
            showDeleteUserDialog: false,
            passwordsDoNotMatch: false,
            passwordIsWeak: false
        };

        this.startEditing = this.startEditing.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.updateUsernameInput = this.updateUsernameInput.bind(this);
        this.updateEmailInput = this.updateEmailInput.bind(this);
        this.updatePasswordInput = this.updatePasswordInput.bind(this);
        this.updateRepeatPasswordInput = this.updateRepeatPasswordInput.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.showDeleteUserDialog = this.showDeleteUserDialog.bind(this);
        this.hideDeleteUserDialog = this.hideDeleteUserDialog.bind(this);
        this.confirmInfoEdition = this.confirmInfoEdition.bind(this);

        this.props.changeNavbar("white");
    }

    updateUsernameInput(username) {
        this.setState({
            newUsername: username
        });
    }

    updatePasswordInput(password) {
        this.setState({
            newPassword: password
        });
    }

    updateRepeatPasswordInput(password) {
        this.setState({
            repeatNewPassword: password
        });
    }

    deleteUser() {
        authService.deleteUser().then(() => {window.location.href = '/'});
    }

    showDeleteUserDialog() {
        this.setState({showDeleteUserDialog: true});
    }

    hideDeleteUserDialog() {
        this.setState({showDeleteUserDialog: false});
    }

    updateEmailInput(email) {
        this.setState({
            newEmail: email
        });
    }

    startEditing(){
        this.setState({editing: true});
    }

    stopEditing(){
        this.setState({editing: false, newUsername: this.state.currentUserInfo.username, newEmail: this.state.currentUserInfo.email});
    }

    confirmInfoEdition(password){
        if(this.state.repeatNewPassword !== this.state.newPassword){
            this.setState({passwordIsWeak: false, passwordsDoNotMatch: true});
        }else if(this.state.newPassword.length < 6){
            this.setState({passwordIsWeak: true, passwordsDoNotMatch: false});
        }else {
            authService.updateUserInfo(this.state.newUsername, this.state.newEmail, this.state.newPassword, password).then((r) => {
                if (r) {
                    authService.fetchUserInfo(false).then(() => {
                        window.location.reload();
                    });
                } else {
                    alert('Password incorrect');
                }
            });
        }
    }

    render() {
        if(authService.currentUserInfo() === null){
            window.location.href = '/';
        }

        return (
            <div className="page" style={{background: "#eee"}}>
                <div className="container div-shadow" style={{paddingLeft: "2%", paddingRight: "2%"}}>
                    <h1 className="text-left font-weight-bold" style={{paddingTop:"2%"}}>
                        <Translate content="general.profile" />
                    </h1>
                    <hr/>
                    <div className="row align-items-end">
                        {!this.state.editing ?
                            <div className="col-md-6 text-left" style={{marginBottom: "5%"}}>
                                <div className="row">
                                    <div className="col-4 text-warning font-weight-bold">
                                        Username:
                                    </div>
                                    <div className="col-8 font-weight-light">
                                        {this.state.currentUserInfo.username}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 text-warning font-weight-bold">
                                        Email:
                                    </div>
                                    <div className="col-8 font-weight-light">
                                        {this.state.currentUserInfo.email}
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: "5%"}}>
                                    <div className="col">
                                        <button className="btn btn-warning w-100" onClick={this.startEditing}>
                                            <Translate content="profilepage.editinfo" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="col-md-6 text-left" style={{marginBottom: "5%"}}>
                                <div className="row">
                                    <div className="col-6 text-warning font-weight-bold">
                                        Email:
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control font-weight-light" aria-label="Small"
                                               value={this.state.newEmail}
                                               onChange={evt => this.updateEmailInput(evt.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 text-warning font-weight-bold">
                                        <Translate content="profilepage.newpassword" />:
                                    </div>
                                    <div className="col-6">
                                        <input type="password" className="form-control font-weight-light" aria-label="Small"
                                               value={this.state.newPassword}
                                               onChange={evt => this.updatePasswordInput(evt.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 text-warning font-weight-bold">
                                        <Translate content="profilepage.repeatnewpassword" />:
                                    </div>
                                    <div className="col-6">
                                        <input type="password" className="form-control font-weight-light" aria-label="Small"
                                               value={this.state.repeatNewPassword}
                                               onChange={evt => this.updateRepeatPasswordInput(evt.target.value)}/>
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: "5%"}}>
                                    <div className="col text-danger">
                                        {this.state.passwordsDoNotMatch && <Translate content="signupmodal.passwordsDoNotMatch" />}
                                        {this.state.passwordIsWeak && <Translate content="signupmodal.passwordNotAccepted" />}
                                    </div>
                                </div>
                                <div className="row" style={{marginTop: "5%"}}>
                                    <div className="col">
                                        <button className="btn btn-danger w-100" onClick={this.stopEditing}>
                                            <Translate content="general.cancel" />
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-warning w-100"
                                                data-toggle="modal" data-target="#confirmpassword">
                                            <Translate content="general.save" />
                                        </button>
                                        <PasswordConfirmation callback={this.confirmInfoEdition}/>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="col-md-6" style={{marginBottom: "5%"}}>
                            <div className="row">
                                <div className="col text-warning font-weight-bold">
                                    <button className="btn btn-danger w-100" onClick={this.showDeleteUserDialog}>
                                        <Translate content="profilepage.deleteaccount" />
                                    </button>
                                    <div>
                                        {
                                            this.state.showDeleteUserDialog &&
                                            <ReactConfirmAlert
                                                title="Delete Account"
                                                message="Are you sure you want to delete your account?"
                                                confirmLabel="Yes"
                                                cancelLabel="No"
                                                onConfirm={this.deleteUser}
                                                onCancel={this.hideDeleteUserDialog}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;