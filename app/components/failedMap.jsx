import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import mapStyles from '../../mapStyle';

export const Map = compose(
  withStateHandlers(
    () => ({
      currentlySelected: null
    }),
    {
      onMarkerClicked: ({ currentlySelected }) => movieId => ({
        currentlySelected: movieId
      })
    },
    {
      removeSelected: ({ currentlySelected }) => () => ({
        currentlySelected: null
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 40.742963, lng: -73.986683 }}
    defaultOptions={{ styles: mapStyles }}
    onClick={() => props.removeSelected}
  >
    {props.allMovies.map(movie => (
      <Marker
        onClick={() => props.onMarkerClicked(movie.id)}
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
        {props.currentlySelected === movie.id && (
          <InfoWindow onCloseClick={() => props.removeSelected}>
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
