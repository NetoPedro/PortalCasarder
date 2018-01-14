import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './SearchPage.css';
import Translate from "react-translate-component";

class SearchResults extends Component {
    render() {

        let results = (this.props.facilityCards.length === 0)?
            <div style={{marginTop: "16px"}}>No results found for this search.</div> : this.props.facilityCards;

        return (
            <div className="container" style={{paddingLeft: "2%", paddingRight: "2%", marginTop: "10px"}}>
                <div className="btn-group" style={{width: "100%"}} role="group" aria-label="Sort types">
                    <button type="button" onClick={this.props.changeSortBy.bind(this, "rating")}
                            className={(this.props.sortBy === 'rating' ? "bg-warning text-white " : "") + "btn btn-sort col"}>
                        <Translate
                            content="searchpage.orderType.bestRatings"
                        />
                    </button>
                    <button type="button" onClick={this.props.changeSortBy.bind(this, "distance")}
                            className={(this.props.sortBy === 'distance' ? "bg-warning text-white " : "") + "btn btn-sort col"}>
                        <Translate
                            content="searchpage.orderType.closer"
                        />
                    </button>
                </div>
                {results}
                <div className="row" style={{marginTop: "16px"}}>
                    <div className="col">
                        <ReactPaginate previousLabel={"Previous 10"}
                                       nextLabel={"Next 10"}
                                       initialPage={0}
                                       breakLabel={<a className="text-dark">...</a>}
                                       pageCount={(this.props.resultsFound/10)}
                                       marginPagesDisplayed={1}
                                       pageRangeDisplayed={2}
                                       onPageChange={this.props.handlePageClick}
                                       containerClassName={"pagination pagination-ul"}
                                       activeClassName={"pagination-active-page"}
                                       pageClassName={"btn"}
                                       nextClassName={"btn"}
                                       previousClassName={"btn"}
                                       pageLinkClassName={"btn-link-black"}
                                       previousLinkClassName={"btn-link-black"}
                                       nextLinkClassName={"btn-link-black"}
                                       breakClassName={"btn btn-link-black"}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResults;