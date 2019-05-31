import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Root from './components/root';

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('main')
);

//Always remember to select the DOM element to anchor the component onto!!
