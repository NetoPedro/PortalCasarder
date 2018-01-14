import React, { Component } from 'react';
import Translate from 'react-translate-component';
import RatingStars from "./RatingStars";
import "./CommentSection.css";
import moment from 'moment';

class Comment extends Component {
    render() {
        return (
            <div className="comment-card">
                <div className="row comment-row">
                    <div className="col-sm-4 text-left font-weight-bold">
                        {this.props.rating.raterUserName}
                        <div className="comment-date font-weight-light">
                            {moment(this.props.rating.date, "MM/DD/YYYY hh:mm:ss a").format("DD/MM/YYYY")}
                        </div>
                    </div>
                    <div className="col-sm-8 text-right font-weight-light">
                        <div className="row-fluid">
                            <div className="d-md-inline-block">
                                <div>
                                    <div className="d-inline-block h3"><RatingStars rating={this.props.rating.average}/></div>
                                </div>
                                {this.props.showAll?
                                    <div>
                                        <div>
                                            <div className="d-inline-block" style={{marginRight: "5px"}}> <Translate content="general.accesses"/> </div>
                                            <div className="d-inline-block"><RatingStars rating={this.props.rating.accessesValue}/></div>
                                        </div>
                                        <div>
                                            <div className="d-inline-block" style={{marginRight: "5px"}}><Translate content="general.premises"/> </div>
                                            <div className="d-inline-block"><RatingStars rating={this.props.rating.premisesValue}/></div>
                                        </div>
                                        {this.props.rating.priceValue !== undefined?
                                            <div>
                                                <div className="d-inline-block" style={{marginRight: "5px"}}><Translate content="general.price"/></div>
                                                <div className="d-inline-block"><RatingStars rating={this.props.rating.priceValue}/></div>
                                            </div>
                                                :
                                                <div/>
                                        }
                                    </div>
                                    :
                                    <div/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row comment-row-text">
                    {this.props.rating.comment}
                </div>
            </div>
        );
    }
}

export default Comment;