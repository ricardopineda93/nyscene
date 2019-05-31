import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllMovies } from '../reducers/allMoviesReducer';

//TODO: if not needed, delete and npm uninstall.
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

class Root extends Component {
  componentDidMount() {
    this.props.fetchAllMovies();
  }
  render() {
    return (
      <div>
        <header>
          <h1>nyscene</h1>
        </header>
        <main>
          <div>Map goes here, please!</div>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAllMovies: () => dispatch(fetchAllMovies())
});

export default connect(
  null,
  mapDispatchToProps
)(Root);
