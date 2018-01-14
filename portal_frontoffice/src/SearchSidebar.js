import React, { Component } from 'react';
import Translate from "react-translate-component";
import counterpart from 'counterpart';
import './SearchSidebar.css';
import DatePicker from "./DatePicker";
import MapComponent from "./Map";
import RatingStarts from "./RatingStars";
import SearchBar from "./SearchBar";

class SearchSidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sports: [],
            categories: [],
            searchByDate: false,
            searchByDistance: false
        };

        this._handleKeyPress = this._handleKeyPress.bind(this);

        this.getSports = this.getSports.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.handleSearchByDateToggle = this.handleSearchByDateToggle.bind(this);
        this.handleSearchByDistanceToggle = this.handleSearchByDistanceToggle.bind(this);
        this.toggleSection = this.toggleSection.bind(this);
    }

    componentDidMount() {
        this.getSports();
        this.getCategories();
    }

    handleSearchByDateToggle(checked) {
        this.setState({
            searchByDate: checked
        }, this.props.handleSearchByDateToggle(checked));
    }

    handleSearchByDistanceToggle() {
        this.setState({
            searchByDistance: !this.state.searchByDistance
        }, this.props.handleSearchByDistanceToggle);
    }

    toggleSection(el){
        if(el !== undefined) {
            if (el.style.display === 'block' || el.style.display === '')
                el.style.display = 'none';
            else
                el.style.display = 'block';
        }

        this.forceUpdate();
    }

    getSports(){
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        fetch('https://casarder.azurewebsites.net/' + counterpart.getLocale() + '/api/sports',
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => response.json())
            .then(function(data) {
                console.log(data);
                let sportsList = data.map((sport) => {

                    return (
                        <div className="input-group search-type-element" key={sport.id}>
                            <input type="checkbox" className="align-self-center" value={sport.id}
                                   onChange={evt => main.props.toggleSport(evt.target.value)} aria-label="Checkbox for following category search"/>
                            <div className="type-name">{sport.name}</div>
                        </div>
                    )
                });

                main.setState({sports: sportsList});

                return sportsList;

            }).catch(function(error) {
            console.log(error);
        });
    }

    getCategories(){
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        fetch('https://casarder.azurewebsites.net/' + counterpart.getLocale() + '/api/categories',
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => response.json())
            .then(function(data) {
                console.log(data);
                let categoriesList = data.map((category) => {

                    return (
                        <div className="input-group search-type-element" key={category.id}>
                            <input type="checkbox" className="align-self-center" value={category.id}
                                   onChange={evt => main.props.toggleCategory(evt.target.value)} aria-label="Checkbox for following category search"/>
                            <div className="type-name with-tooltip">
                                {category.name}
                                <span className="tooltiptext">{category.description}</span>
                            </div>
                        </div>
                    )
                });

                main.setState({categories: categoriesList});

                return categoriesList;

            }).catch(function(error) {
            console.log(error);
        });
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.search();
        }
    };

    render() {
        return (
            <div className="container side-bar div-shadow">
                <div className="row search-row">
                    {/*
                     <div className="input-group">
                        <Translate
                            component="input"
                            type="text"
                            attributes={{placeholder: 'searchpage.sidebar.search_placeholder'}}
                            onKeyPress={this._handleKeyPress}
                            onChange={evt => this.props.updateInputValue(evt.target.value)}
                            value={this.props.searchInput}
                            className="form-control search-bar"
                        />
                    </div>
                    */}
                    <SearchBar search={this.props.search} updateInputValue={this.props.updateInputValue} inputValue={this.props.searchInput}/>
                </div>
                <div className="row search-row">
                    <div className="container search-type-group">
                        <button className="search-type-title text-uppercase " onClick={()=>this.toggleSection(this.datesearch_div)}>
                            <Translate
                                content="searchpage.sidebar.date"
                            />
                            <span aria-hidden="true" className="text-right h5" style={{float: "right", margin: "0"}}>
                                {this.datesearch_div !== undefined?
                                    (this.datesearch_div.style.display === 'none'? '+' : '-')
                                    :
                                    '-'
                                }
                            </span>
                        </button>
                        <div ref={ datesearch_div => this.datesearch_div = datesearch_div}>
                            <div className="input-group search-type-element">
                                <input type="checkbox" className="align-self-center"
                                       onClick={checkbox => this.handleSearchByDateToggle(checkbox.target.checked)}
                                       aria-label="Checkbox for following category search"/>
                                <span className="type-name">
                                    <Translate
                                        content="searchpage.sidebar.searchbydate"
                                    />
                                </span>
                            </div>
                            <div className="search-type-element">
                                <DatePicker
                                    handleChange={this.props.handleDateSelected}
                                    date={this.props.date}
                                    disabled={!this.state.searchByDate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row search-row">
                    <div className="container search-type-group">
                        <button className="search-type-title text-uppercase bg-transparent" onClick={()=>this.toggleSection(this.ratings_div)}>
                            <Translate
                                content="searchpage.sidebar.searchbyratings"
                            />
                            <span aria-hidden="true" className="text-right h5" style={{float: "right", margin: "0"}}>
                                {this.ratings_div !== undefined?
                                    (this.ratings_div.style.display === 'none'? '+' : '-')
                                    :
                                    '-'
                                }
                            </span>
                        </button>
                        <div className="text-left" ref={ ratings_div => this.ratings_div = ratings_div}>
                            <div className="search-type-element type-name">
                                <Translate content="searchpage.sidebar.ratings.general" />
                                <div style={{float: "right"}}>
                                    <RatingStarts
                                        rating={this.props.searchAverageRating}
                                        handleClick={this.props.updateSearchAverageRating}/>
                                </div>
                            </div>
                            <div className="search-type-element type-name">
                                <Translate content="searchpage.sidebar.ratings.price" />
                                <div style={{float: "right"}}>
                                    <RatingStarts
                                        rating={this.props.searchPriceRating}
                                        handleClick={this.props.updateSearchPriceRating}/>
                                </div>
                            </div>
                            <div className="search-type-element type-name">
                                <Translate content="searchpage.sidebar.ratings.acesses" />
                                <div style={{float: "right"}}>
                                    <RatingStarts
                                        rating={this.props.searchAccessesRating}
                                        handleClick={this.props.updateSearchAccessesRating}/>
                                </div>
                            </div>
                            <div className="search-type-element type-name">
                                <Translate content="searchpage.sidebar.ratings.premises" />
                                <div style={{float: "right"}}>
                                    <RatingStarts
                                        rating={this.props.searchPremisesRating}
                                        handleClick={this.props.updateSearchPremisesRating}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row search-row">
                    <div className="container search-type-group">
                        <button className="search-type-title text-uppercase bg-transparent" onClick={()=>this.toggleSection(this.sports_div)}>
                            <Translate
                                content="searchpage.sidebar.sports"
                            />
                            <span aria-hidden="true" className="text-right h5" style={{float: "right", margin: "0"}}>
                                {this.sports_div !== undefined?
                                    (this.sports_div.style.display === 'none'? '+' : '-')
                                    :
                                    '-'
                                }
                            </span>
                        </button>
                        <div style={{display: "none"}} ref={ sports_div => this.sports_div = sports_div}>
                            {this.state.sports}
                        </div>
                    </div>
                </div>
                <div className="row search-row">
                    <div className="container search-type-group">
                        <button className="search-type-title text-uppercase" onClick={()=>this.toggleSection(this.categories_div)}>
                            <Translate
                                content="searchpage.sidebar.categories"
                            />
                            <span aria-hidden="true" className="text-right h5" style={{float: "right", margin: "0"}}>
                                {this.categories_div !== undefined?
                                    (this.categories_div.style.display === 'none'? '+' : '-')
                                    :
                                    '-'
                                }
                            </span>
                        </button>
                        <div style={{display: "none"}} ref={ categories_div => this.categories_div = categories_div}>
                            {this.state.categories}
                        </div>
                    </div>
                </div>
                <div className="row search-row">
                    <div className="container search-type-group">
                        <button className="search-type-title text-uppercase" onClick={()=>this.toggleSection(this.map_div)}>
                            <Translate
                                content="searchpage.sidebar.map"
                            />
                            <span aria-hidden="true" className="text-right h5" style={{float: "right", margin: "0"}}>
                                {this.map_div !== undefined?
                                    (this.map_div.style.display === 'none'? '+' : '-')
                                    :
                                    '-'
                                }
                            </span>
                        </button>
                        <div style={{display: "none"}} ref={ map_div => this.map_div = map_div}>
                            <div className="input-group search-type-element">
                                <input type="checkbox" className="align-self-center" onClick={this.handleSearchByDistanceToggle}
                                       aria-label="Checkbox for following category search"/>
                                <span className="type-name">
                                    <Translate
                                        content="searchpage.sidebar.searchbyrange"
                                    />
                                </span>
                            </div>
                            <div className="input-group search-type-element">
                                <input value={this.props.range}
                                       onChange={v => this.props.handleSearchRangeChange(v.target.value)}
                                       type="number" min="500" max="50000" step="500" className="form-control search-bar"
                                       placeholder="Search range" aria-label="search query"
                                       aria-describedby="search query"  disabled={!this.state.searchByDistance}/>
                                <span className="input-group-addon">
                                    <Translate
                                    content="searchpage.sidebar.meters"
                                    />
                                </span>
                            </div>
                            <small className="form-text text-muted">
                                <Translate
                                    content="searchpage.sidebar.range_explained"
                                />
                            </small>
                            <div className="search-type-element">
                                <MapComponent lat={this.props.lat} lng={this.props.lng}
                                              updatePosition={this.props.updatePosition}
                                              goToCurrentLocation={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SearchSidebar;