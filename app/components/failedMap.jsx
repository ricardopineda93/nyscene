import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

export const Map = compose(
  withStateHandlers(
    () => ({
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: {}
    }),
    {
      onMarkerClicked: ({ selectedPlace, activeMarker }) => (
        props,
        marker,
        e
      ) => ({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    },
    {
      onMapClicked: ({
        showingInfoWindow,
        activeMarker,
        selectedPlace
      }) => props => ({
        showingInfoWindow: false,
        activeMarker: {}
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 40.742963, lng: -73.986683 }}
    onClick={e => props.onMapClicked}
  >
    {props.allMovies.map(movie => (
      <Marker
        onClick={props.onMarkerClicked(movie.id)}
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
      >
        {props.showingInfoWindow && (
          <InfoWindow onCloseClick={props.onToggleOpen}>
            <div>
              <h4>{movie.film}</h4>
              <small>{movie.year}</small>
              <p>{movie.neighborhood}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));
