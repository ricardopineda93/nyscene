import { combineReducers } from 'redux';
import { allMoviesReducer } from './allMoviesReducer';
import { omdbMovieReducer } from './omdbMovieReducer';

const rootReducer = combineReducers({
  allMovies: allMoviesReducer,
  omdbMovie: omdbMovieReducer
});

export default rootReducer;
