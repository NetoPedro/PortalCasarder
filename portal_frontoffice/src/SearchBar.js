import React, { Component } from 'react';
import Translate from 'react-translate-component';
import {Link, withRouter} from "react-router-dom";
import facilityService from './service/facility-service';
import './MainSearchBar.css';
import Autosuggest from "react-autosuggest";
var counterpart = require('counterpart');

const suggestions = [
    {
        title: 'Localidades',
        suggestions: []
    },
    {
        title: 'Recintos',
        suggestions: []
    }
];

const getSuggestions = (value, callback) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    suggestions[0].suggestions = [];
    suggestions[1].suggestions = [];

    let results = [];

    if(inputLength === 0){
        callback(results);
    }

    //return suggestions.filter(section => section.suggestions.length > 0);

    facilityService.searchLocationsWithSolr(inputValue).then((data) => {

        suggestions[0].suggestions = data.suggest.infixSuggester[inputValue].suggestions;

        facilityService.searchFacilitiesSuggestionsWithSolr(inputValue).then((data) => {

            suggestions[1].suggestions = data.suggest.infixSuggester[inputValue].suggestions;

            results = suggestions.filter(section => section.suggestions.length > 0);
            callback(results);
        })
    });

};

const getSuggestionValue = suggestion => suggestion.term;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.payload !== ''? <img style={{width: "35px", height: "35px", marginRight: "5px"}} src={suggestion.payload}/> : <div/>}
        {suggestion.term}
        {suggestion.payload !== ''? <div/> : <div className="text-muted d-inline-block font-weight-light" style={{marginLeft: "5px"}}> - {suggestion.weight} results</div>}
    </div>
);

const renderSectionTitle = section => {
    return (
        <strong>{section.title}</strong>
    );
};

const getSectionSuggestions = section => {
    return section.suggestions;
};


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            suggestions: []
        };

        this.updateInputValue = this.updateInputValue.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    }

    updateInputValue = (event, { newValue }) => {
        this.props.updateInputValue(newValue);
    };

    onSuggestionsFetchRequested = ({ value }) => {
        let main = this;
        getSuggestions(value,
            (suggestions) => {main.setState({suggestions: suggestions})}
        );
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };


    render() {
        let inputProps = {
            placeholder:  counterpart('general.placeholder'),
            value: this.props.inputValue,
            onChange: this.updateInputValue
        };

        //facilityService.searchLocationsWithSolr(this.state.inputValue);

        return (
            <div className="container d-flex justify-content-center">
                <div className="row main-search-bar">
                    <div className="col-12 input-group" style={{paddingLeft: "0", paddingRight: "0", marginBottom: "2%", height: "50px"}}>
                        {/*
                        <Translate
                            component="input"
                            type="text"
                            attributes={{ placeholder: 'homepage.searchbar.placeholder'}}
                            onKeyPress={this._handleKeyPress}
                            onChange={evt => this.updateInputValue2(evt.target.value)}
                            value={this.state.inputValue}
                            className="form-control"
                        />
                        */}
                        <Autosuggest
                            suggestions={this.state.suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                            multiSection={true}
                            renderSectionTitle={renderSectionTitle}
                            getSectionSuggestions={getSectionSuggestions}
                        />
                    </div>
                    <div className="col-12" style={{paddingLeft: "0", paddingRight: "0", marginBottom: "2%",height: "50px"}}>
                        <span className="input-group-btn w-100 h-100" style={{overflow: "hidden"}}>
                            <button className="btn btn-warning btn-lg border-0 w-100" id="search-btn-2" onClick={this.props.search}>
                                <Translate
                                    content="homepage.searchbar.button"
                                />
                            </button>
                        </span>
                    </div>
                    {/*
                    <Link to={{ pathname: '/search'}} className="btn btn-link btn-sm text-right">
                        <Translate
                        content="homepage.searchbar.advancedsearch"
                        />
                    </Link>
                    */}
                </div>
            </div>
        );
    }
}

export default SearchBar;
