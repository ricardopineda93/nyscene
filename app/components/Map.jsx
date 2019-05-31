import React from 'react';
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
      {console.log(props.allMovies)}

      {props.allMovies.map(movie => (
        <Marker
          key={movie.imdbId}
          position={{ lat: +movie.lat, lng: +movie.lng }}
        />
      ))}
    </GoogleMap>
  ))
);
