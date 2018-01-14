import React, {Component} from 'react';
import moment from 'moment';
import counterpart from 'counterpart';
import ReactLoading from 'react-loading';
import facilityService from './service/facility-service';
import SearchSidebar from "./SearchSidebar";
import FacilityCard from "./FacilityCard";
import './SearchPage.css';
import SearchResults from "./SearchResults";

class SearchPage extends Component {

    constructor(props) {
        super(props);

        let searchInput = (typeof(this.props.location) !== 'undefined' && typeof(this.props.location.state) !== 'undefined')? this.props.location.state.input : "";

        this.state = {
            facilityCards: [],
            facilities: [],
            offset: 0,
            resultsFound: 0,
            selectedSports: [],
            selectedCategories: [],
            searchAverageRating: 0,
            searchAccessesRating: 0,
            searchPremisesRating: 0,
            searchPriceRating: 0,
            searchInput: searchInput,
            rightSideContent: "results",
            selectedFacility: Number,
            sortBy: "rating",
            date: moment(),
            searchByDate: false,
            searchByDistance: false,
            searchRange: 500,
            lat: 41.178031,
            lng: -8.608133,
            searching: true,
            idsToFilter: []
        };

        this.search = this.search.bind(this);
        this.toggleSport = this.toggleSport.bind(this);
        this.toggleCategory = this.toggleCategory.bind(this);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateSearchAverageRating = this.updateSearchAverageRating.bind(this);
        this.updateSearchAccessesRating = this.updateSearchAccessesRating.bind(this);
        this.updateSearchPremisesRating = this.updateSearchPremisesRating.bind(this);
        this.updateSearchPriceRating = this.updateSearchPriceRating.bind(this);
        this.showFacilityDetails = this.showFacilityDetails.bind(this);
        this.showResults = this.showResults.bind(this);
        this.changeSortBy = this.changeSortBy.bind(this);
        this.handleDateSelected = this.handleDateSelected.bind(this);
        this.handleSearchByDateToggle = this.handleSearchByDateToggle.bind(this);
        this.handleSearchRangeChange = this.handleSearchRangeChange.bind(this);
        this.handleSearchByDistanceToggle = this.handleSearchByDistanceToggle.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);

        this.props.changeNavbar("white");
    }

    componentWillMount() {
        return this.search();
    }

    handlePageClick(data){
        let selected = data.selected;
        let newOffset = Math.ceil(selected * 10);

        this.setState({
            offset: newOffset
        }, this.search);
    };

    toggleSport(sport){
        var list = this.state.selectedSports;

        var index = list.indexOf(sport);
        if(index < 0) {
            list.push(sport);

            this.setState({selectedSports: list, offset: 0}, this.search);
        }else{
            list.splice(index, 1);
            this.setState({selectedSports: list, offset: 0}, this.search);
        }
    }


    updateSearchAverageRating(rating){
        if(this.state.searchAverageRating === 1 && rating === 1){
            rating = 0;
        }
        this.setState({searchAverageRating: rating}, this.search);
    }

    updateSearchAccessesRating(rating){
        if(this.state.searchAccessesRating === 1 && rating === 1){
            rating = 0;
        }
        this.setState({searchAccessesRating: rating}, this.search);
    }

    updateSearchPremisesRating(rating){
        if(this.state.searchPremisesRating === 1 && rating === 1){
            rating = 0;
        }
        this.setState({searchPremisesRating: rating}, this.search);
    }

    updateSearchPriceRating(rating){
        if(this.state.searchPriceRating === 1 && rating === 1){
            rating = 0;
        }
        this.setState({searchPriceRating: rating}, this.search);
    }

    toggleCategory(category){
        var list = this.state.selectedCategories;

        var index = list.indexOf(category);
        if(index < 0) {
            list.push(category);

            this.setState({selectedCategories: list, offset: 0}, this.search);
        }else{
            list.splice(index, 1);
            this.setState({selectedCategories: list, offset: 0}, this.search);
        }
    }

    updateInputValue(evt) {
        this.setState({
            searchInput: evt
        });
    }

    updatePosition(latitude, longitude) {
        this.setState({
            lat: latitude,
            lng: longitude
        });
    }

    changeSortBy(sortBy){
        this.setState({
            sortBy: sortBy
        }, this.search);
    }

    handleDateSelected(date){
        let main = this;

        this.setState({
            date: date, offset: 0
        }, () => {

            let facilityIdsToFilter = [];
                facilityService.searchFacilitiesByDate(main.state.date).then((data) => {
                    data.map((id) => {
                        facilityIdsToFilter.push(id);
                    });

                    main.setState({
                        idsToFilter: facilityIdsToFilter
                    }, main.search);
                });
        });
    }

    handleSearchByDateToggle(checked){

        let main = this;
        let facilityIdsToFilter = [];
        if(checked){
            facilityService.searchFacilitiesByDate(this.state.date).then((data) => {
                data.map((id) => {
                    facilityIdsToFilter.push(id);
                });

                main.setState({
                    searchByDate: checked, offset: 0, idsToFilter: facilityIdsToFilter
                }, main.search);
            });
        }else {
            this.setState({
                searchByDate: checked, offset: 0, idsToFilter: facilityIdsToFilter
            }, this.search);
        }
    }

    handleSearchByDistanceToggle(){
        this.setState({
            searchByDistance: !this.state.searchByDistance, offset: 0
        }, this.search);
    }

    handleSearchRangeChange(range){
        this.setState({
            searchRange: range, offset: 0
        }, this.search);
    }

    showFacilityDetails(facilityIndex){
        this.setState({
            rightSideContent: "details",
            selectedFacility: facilityIndex
        });
    }

    showResults(){
        this.setState({
            rightSideContent: "results",
            selectedFacility: -1
        });
    }

    search(){

        this.setState({searching: true}, function () {
            if(window.pageYOffset > 1700){
                window.scrollTo(0, 250);
            }
        });

        let main = this;

        facilityService.searchFacilitiesWithSolr(
            this.state.searchInput,
            this.state.searchAverageRating,
            this.state.searchPriceRating,
            this.state.searchPremisesRating,
            this.state.searchAccessesRating,
            this.state.offset,
            this.state.selectedCategories,
            this.state.selectedSports,
            this.state.lng,
            this.state.lat,
            this.state.searchRange/1000,
            this.state.searchByDistance,
            this.state.sortBy,
            this.state.searchByDate,
            this.state.idsToFilter
        ).then(function(data) {

            let count = -1;

            let facilityList = data.response.docs.map((facility) => {

                count++;

                return (
                    <FacilityCard facility={facility} key={facility.id} index={count} seeDetails={main.showFacilityDetails}/>
                )
            });

            main.setState({facilityCards: facilityList, facilities: data.response.docs, searching: false, resultsFound: data.response.numFound});

            return facilityList;

        })


    }

    render() {

        let searching = this.state.searching? <ReactLoading type="spin" color="#F3C043" delay={0} className="loading-spin-top"/> : "";

        return (
            <div className="page-marg-top-lg col row" style={{marginLeft: "0", marginRight: "0", paddingLeft: "0", paddingRight: "0"}}>
                <div className="col-sm-3" style={{padding: "0px"}}>
                    <SearchSidebar updateInputValue={this.updateInputValue} searchInput={this.state.searchInput} search={this.search}
                                   range={this.state.searchRange} handleSearchRangeChange={this.handleSearchRangeChange}
                                   handleDateSelected={this.handleDateSelected} date={this.state.date} toggleSport={this.toggleSport}
                                   toggleCategory={this.toggleCategory} handleSearchByDateToggle={this.handleSearchByDateToggle}
                                   handleSearchByDistanceToggle={this.handleSearchByDistanceToggle}
                                   searchAverageRating={this.state.searchAverageRating}
                                   updateSearchAverageRating={this.updateSearchAverageRating}
                                   searchAccessesRating={this.state.searchAccessesRating}
                                   updateSearchAccessesRating={this.updateSearchAccessesRating}
                                   searchPremisesRating={this.state.searchPremisesRating}
                                   updateSearchPremisesRating={this.updateSearchPremisesRating}
                                   searchPriceRating={this.state.searchPriceRating}
                                   updateSearchPriceRating={this.updateSearchPriceRating}
                                   updatePosition={this.updatePosition} lat={this.state.lat} lng={this.state.lng}/>
                </div>
                <div className="col-sm-9" style={{marginTop:"0", padding: "0"}}>
                    <header className="search-page-header"><div className="snow"/></header>
                    <div style={{paddingLeft: "2%"}}>
                        <SearchResults facilityCards={this.state.facilityCards} changeSortBy={this.changeSortBy} sortBy={this.state.sortBy}
                                       resultsFound={this.state.resultsFound} handlePageClick={this.handlePageClick}/>
                        {this.state.searching? <div style={{background: "rgba(255, 255, 255, 0.8)",
                            width: "100%", height: "100%", position: "absolute", top: "0", left: "0"}}/> : <div/> }
                        {searching}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPage;