import moment from 'moment';

export default {
    loggedUser(){
        if(!localStorage.getItem("username")){
            if(!sessionStorage.getItem("username")){ return null; }
            else {
                return sessionStorage.getItem("username");
            }
        }
        else {
            return localStorage.getItem("username");
        }
    },

    currentUserInfo(){
        if(!localStorage.getItem("username")){
            if(!sessionStorage.getItem("username")){ return null; }
            else {
                return {username: sessionStorage.getItem("username"), email: sessionStorage.getItem('email')};
            }
        }
        else {
            return {username: localStorage.getItem("username"), email: localStorage.getItem('email')};
        }
    },

    token(){
        return localStorage.getItem("token") || sessionStorage.getItem('token');
    },

    logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("email");
        localStorage.removeItem("username");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("expiration");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("username");
    },

    userSignin(username, password, rememberme) {
        let main = this;

        return fetch('https://casarder.azurewebsites.net/pt/api/account/token',
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body:JSON.stringify(
                    {
                        username: username,
                        password: password
                    })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(
                response => response.json()
            ).then((responseData) => {
                if(rememberme){
                    localStorage.setItem("token", responseData.token);
                    localStorage.setItem("expiration", responseData.expiration);
                } else {
                    sessionStorage.setItem("token", responseData.token);
                    sessionStorage.setItem("expiration", responseData.expiration);
                }

                console.log('Authenticated.');

                return main.fetchUserInfo(rememberme);

            }).catch(function(error) {
                console.log(error);
                return false;
            });
    },

    userSignup(username, password, email) {
        return fetch('https://casarder.azurewebsites.net/pt/api/account/register',
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body:JSON.stringify(
                    {
                        username: username,
                        password: password,
                        email: email
                    })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(() => {

                console.log('account created');

                return true;

            }).catch(function(error) {
                console.log(error);
                return false;
            });
    },

    facebookUserSignin: function (accessToken, redirect) {
        let main = this;
        return fetch('https://casarder.azurewebsites.net/pt/api/account/login/facebook?redirect_uri=' + redirect,
            {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
                body:JSON.stringify(
                    {
                        accessToken: accessToken
                    })
            })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(
                response => response.json()
            ).then((responseData) => {
                localStorage.setItem("token", responseData.token);
                localStorage.setItem("expiration", responseData.expiration);

                console.log('Authenticated');

                return main.fetchUserInfo(false);

            }).catch(function (error) {
                console.log(error);
                return false;
            });
    },

    deleteUser: function () {
        let main = this;
        return fetch('https://casarder.azurewebsites.net/pt/api/account',
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + main.token()
                }
            })
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                console.log('logout after remove');
                main.logout();
                return response;
            }).catch(function (error) {
                console.log(error);
                return false;
            });
    },

    fetchUserInfo(toLocal){
        let main = this;
        return fetch('https://casarder.azurewebsites.net/pt/api/account/info',
            {
                method: 'GET',
                headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + main.token()
                },
            })
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(
            response => response.json()
        ).then((responseData) => {
            if(toLocal) {
                localStorage.setItem("username", responseData.username);
                localStorage.setItem("email", responseData.email);
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("email");
            }else{
                sessionStorage.setItem("username", responseData.username);
                sessionStorage.setItem("email", responseData.email);
                localStorage.removeItem("username");
                localStorage.removeItem("email");
            }

            console.log('Info received');

            return true;

        }).catch(function(error) {
            console.log(error);
            return false;
        });
    },

    refreshToken(){
        let main = this;

        let local = localStorage.getItem('token') !== null;

        setInterval(function () {
            if(moment(local? localStorage.getItem('expiration') : sessionStorage.getItem('expiration')).subtract(30, 'seconds').isSameOrBefore(moment())){


                if(moment(local? localStorage.getItem('expiration') : sessionStorage.getItem('expiration')).isBefore(moment())){
                    main.logout();
                    return;
                }

                fetch('https://casarder.azurewebsites.net/pt/api/account/RenewToken',
                    {
                        method: 'POST',
                        headers: { 'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + main.token()
                        },
                    }).then(
                    response => response.json()
                ).then((responseData) => {
                    if(local) {
                        localStorage.setItem("token", responseData.token);
                        localStorage.setItem("expiration", responseData.expiration);
                    }else{
                        sessionStorage.setItem("token", responseData.token);
                        sessionStorage.setItem("expiration", responseData.expiration);
                    }

                }).catch(function(error) {
                    console.log(error);
                });
            }
        }, 10000);
    },

    updateUserInfo(newUsername, newEmail, newPassword, currentPassword) {
        let main = this;

        if(newPassword === null || newPassword === ''){
            newPassword = '';
        }

        let local = localStorage.getItem('token') !== null;

        return fetch('https://casarder.azurewebsites.net/pt/api/account/',
            {
                method: 'PUT',
                headers: { 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + main.token()
                },
                body:JSON.stringify(
                    {
                        NewUsername: newUsername,
                        NewEmail: newEmail,
                        NewPassword: newPassword,
                        OldPassword: currentPassword
                    })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            }).then(response => response.json())
            .then((data) => {

                console.log('user data changed with success');

                if(local) {

                    console.log(localStorage.getItem('token'));
                    console.log(data.token);

                    localStorage.setItem("token", data.token);
                    localStorage.setItem("expiration", data.expiration);
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("expiration");
                }else{

                    console.log(sessionStorage.getItem('token'));
                    console.log(data.token);

                    localStorage.setItem("token", data.token);
                    localStorage.setItem("expiration", data.expiration);
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("expiration");
                }

                return true;

            }).catch(function(error) {
                console.log(error);
                return false;
            });
    },
}