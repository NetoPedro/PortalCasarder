'use strict';

var React = require('react');
var createReactClass = require('create-react-class');

var SimpleForecast = createReactClass({
    displayName: 'SimpleForecast',

    getDefaultProps: function getDefaultProps() {
        return {
            height: 245,
            width: '100%'
        };
    },

    render: function render() {
        var url = '//forecast.io/embed/#lat=' + this.props.latitude + '&lon=' + this.props.longitude + '&name=' + this.props.name  + '&units=' + this.props.units ;
        console.log(url);
        return React.createElement('iframe', { type: 'text/html', height: this.props.height, width: this.props.width, frameBorder: '0', src: url });
    }
});

export default SimpleForecast;
