import React, { Component } from 'react';
import Translate from 'react-translate-component';
import MainSearchBar from "./MainSearchBar";

class HomePageHeader extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <div className="text-center">
                        <div className="header-text container">
                            <h1 className="App-title font-weight-bold text-left text-uppercase col-md-7">
                                <Translate content="homepage.header_text" />
                            </h1>
                            {/*<h3 className="App-intro font-weight-light text-left">Não tem conta? Junte-se a nós.</h3>*/}
                        </div>
                        <MainSearchBar/>
                    </div>
                </header>
            </div>
        );
    }
}

export default HomePageHeader;
