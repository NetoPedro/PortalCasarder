import React, { Component } from 'react';
import Translate from 'react-translate-component';
import Comment from "./Comment";
import "./CommentSection.css";

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookerRatings: [],
            participantRatings: [],
            offset: 0
        };

        this.search = this.search.bind(this);
    }

    componentWillMount() {
        return this.search();
    }

    search(){
        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        const main = this;

        fetch('http://casarder.azurewebsites.net/pt/api/ratings?facilityId='
            + this.props.facilityId,
            {
                method: 'GET',
                headers: headers
            })
            .then((response) => response.json())
            .then(function(data) {

                console.log(data);

                main.setState({bookerRatings: data.bookerRatings, participantRatings: data.participantRatings});

                return data;

            }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        let comments = [];

        if(this.state.bookerRatings !== undefined) {
            comments = this.state.bookerRatings.map(r => {
                return <Comment rating={r} key={r.id} showAll={false}/>;
            });
        }

        if(this.state.participantRatings !== undefined) {
            comments.push(this.state.participantRatings.map(r => {
                return <Comment rating={r} key={r.id} showAll={false}/>;
            }));
        }

        return (
            <div>
                {comments}
            </div>
        );
    }
}

export default CommentList;