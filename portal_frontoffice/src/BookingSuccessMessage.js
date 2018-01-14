import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
        margin: "auto",
        padding: "3%",
        height: "fit-content",
        width: "fit-content",
        overflowY: "scroll",
        textAlign: "center",
    }
};

class BookingResultMessage extends Component {

    render() {

        return (
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.props.afterOpenModal}
                    onRequestClose={this.props.closeModal}
                    style={customStyles}
                    contentLabel="Message Modal"
                >
                    <div className="container text-center">
                        <img src={this.props.image} className="img-fluid" style={{width:"15%",height:"15%"}}/>
                        <p>{this.props.message}</p>
                    </div>

                </Modal>
            </div>
        );}
}

export default BookingResultMessage;