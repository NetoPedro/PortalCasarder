import React, { Component } from 'react';

class RatingStarts extends Component {
    render() {
        let ratingStars = [
            <li className="fa fa-star d-inline-block" key={0} value={1} onClick={star => this.props.handleClick(star.target.value)}/>,
            <li className="fa fa-star d-inline-block" key={1} value={2} onClick={star => this.props.handleClick(star.target.value)}/>,
            <li className="fa fa-star d-inline-block" key={2} value={3} onClick={star => this.props.handleClick(star.target.value)}/>,
            <li className="fa fa-star d-inline-block" key={3} value={4} onClick={star => this.props.handleClick(star.target.value)}/>,
            <li className="fa fa-star d-inline-block" key={4} value={5} onClick={star => this.props.handleClick(star.target.value)}/>
        ];

        for(let i = 0 ; i < this.props.rating-0.49; i++){
            ratingStars[i] = <li className="fa fa-star checked d-inline-block" key={i} value={i+1} onClick={star => this.props.handleClick(star.target.value)}/>;
        }

        return (
            <div>
                {ratingStars}
            </div>
        );
    }
}

RatingStarts.defaultProps = { handleClick: function () {} };

export default RatingStarts;