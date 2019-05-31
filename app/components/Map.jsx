import React, { Component } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

export const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 40.742963, lng: -73.986683 }}
    >
      {props.allMovies.map(movie => (
        <Marker
          filmTitle={movie.film}
          key={movie.id}
          imdbId={movie.imdbId}
          year={movie.year}
          locationDetails={movie.locationDetails}
          neighborhood={movie.neighborhood}
          boro={movie.boro}
          position={{ lat: +movie.lat, lng: +movie.lng }}
          icon={{
            url: 'http://maps.google.com/mapfiles/kml/pal2/icon30.png'
          }}
        />
      ))}
    </GoogleMap>
  ))
);

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  render() {
    return (
      <Map
        storeProps={this.props}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
      />
    );
  }
}
