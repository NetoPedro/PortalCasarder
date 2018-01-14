import React, {Component} from 'react';
import Translate from 'react-translate-component';
import ratingService from './service/rating-service';
import RatingStars from './RatingStars';

class RateBookingSection extends Component {

    constructor(props) {
        super(props);

        if(this.props.rating === null) {
            this.state = {
                price: 0,
                accesses: 0,
                premises: 0,
                average: 0,
                comment: '',
                createNew: true
            }
        }else{
            this.state = {
                price: this.props.rating.priceValue,
                accesses: this.props.rating.accessesValue,
                premises: this.props.rating.premisesValue,
                average: this.props.rating.average,
                comment: this.props.rating.comment,
                createNew: false
            }
        }

        this.updatePriceRating = this.updatePriceRating.bind(this);
        this.updateAccessesRating = this.updateAccessesRating.bind(this);
        this.updatePremisesRating = this.updatePremisesRating.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.updateAverage = this.updateAverage.bind(this);
        this.onSendButtonPressed = this.onSendButtonPressed.bind(this);
    }

    updateAverage(){
        if(this.props.isAuthor) {
            this.setState({average: (this.state.price + this.state.accesses + this.state.premises) / 3});
        } else{
            this.setState({average: (this.state.accesses + this.state.premises) / 2});
        }
    }

    updatePriceRating(priceRating){
        this.setState({price: priceRating}, this.updateAverage);
    }

    updateAccessesRating(accessesRating){
        this.setState({accesses: accessesRating}, this.updateAverage);
    }

    updatePremisesRating(premisesRating){
        this.setState({premises: premisesRating}, this.updateAverage);
    }

    updateComment(comment){
        this.setState({comment: comment});
    }

    onSendButtonPressed(){
        let main = this;
        if(this.state.createNew){
            ratingService.newRating(this.props.bookingId, this.state.price, this.state.accesses, this.state.premises, this.state.comment)
                .then(id => {main.props.onRateDone(id);});
        } else{
            ratingService.updateRating(this.props.rating.id, this.state.price, this.state.accesses, this.state.premises, this.state.comment)
                .then(id => {main.props.onRateDone(id);});
        }
    }

    render() {
        return (
            <div className="container font-weight-light h6">
                <div className="row">
                    <div className="col">
                        {this.props.isAuthor ?
                            <div className="row">
                                <div className="col">
                                    <Translate content="general.price"/>
                                </div>
                                <div className="col text-right">
                                    <RatingStars rating={this.state.price} handleClick={this.updatePriceRating}/>
                                </div>
                            </div>
                            :
                            <div/>
                        }
                        <div className="row">
                            <div className="col">
                                <Translate content="general.accesses"/>
                            </div>
                            <div className="col text-right">
                                <RatingStars rating={this.state.accesses} handleClick={this.updateAccessesRating}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Translate content="general.premises"/>
                            </div>
                            <div className="col text-right">
                                <RatingStars rating={this.state.premises} handleClick={this.updatePremisesRating}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col h4 text-center">
                                <RatingStars rating={this.state.average} handleClick={this.updateAverage}/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="commentTextArea">Comment</label>
                            <textarea className="form-control" id="commentTextArea" rows="3" onChange={evt => this.updateComment(evt.target.value)}
                                      placeholder="Leave a comment and feedback" maxLength={500}>
                                {this.state.comment}
                            </textarea>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="btn btn btn-warning w-100" onClick={this.onSendButtonPressed}>
                            <Translate content="general.send"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RateBookingSection;