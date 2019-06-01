import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import mapStyles from '../../mapStyle';
import { fetchMovie } from '../reducers/omdbMovieReducer';
import { connect } from 'react-redux';

//TODO: Integrate geolocation - if user location is available make center of map
//user coords and drop a pin. Otherwise, default to Madison Sq Park.
const Map = compose(
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
        onClick={() =>
          props
            .fetchMovie(movie.imdbId)
            .then(() => props.onMarkerClicked(movie.id))
        }
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
              <h4>
                {props.selectedMovie.Title}{' '}
                <small>
                  <i>({props.selectedMovie.Year})</i>
                </small>
              </h4>
              <img src={props.selectedMovie.Poster} height="250" width="190" />
              <p>{movie.locationDetails}</p>
              <p>
                {movie.neighborhood},<br />
                {movie.boro}
                <br />
                <a href={movie.imdbLink} target="_blank">
                  <small>IMDb Link</small>
                </a>
                <br />
              </p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

const mapStateToProps = state => ({
  selectedMovie: state.omdbMovie.selectedMovie
});
const mapDispatchToProps = dispatch => ({
  fetchMovie: imdbId => dispatch(fetchMovie(imdbId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
