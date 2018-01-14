import React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDAdbUS1U7R6l30M2URoN-gXjR90aglhJI",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
        center={{ lat: props.lat, lng: props.lng }}
    >
        {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} onClick={props.onMarkerClick} />}
    </GoogleMap>
);

class MapComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            color: props.initialColor
        };

        this.goToCurrentLocation = this.goToCurrentLocation.bind(this);
        if(this.props.goToCurrentLocation) {
            this.goToCurrentLocation();
        }
    }

    goToCurrentLocation(){
        var main = this;
        navigator.geolocation.getCurrentPosition(function (position) {
            main.props.updatePosition(position.coords.latitude, position.coords.longitude)
        },function (position) {

        },{timeout:10000});
    }

    componentDidMount() {
        this.delayedShowMarker();
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    };

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false });
        this.delayedShowMarker()
    };

    render() {
        return (
            <MyMapComponent
                lat = {this.props.lat}
                lng = {this.props.lng}
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
            />
        )
    }
}

export default MapComponent;