import React, { Component } from 'react';
import { Map } from './Map';
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
          <div>
            <Map
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBz2Yp_ZcjaR9U5VNWeUFz0FK0Qu1eNhLw&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `600px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
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
