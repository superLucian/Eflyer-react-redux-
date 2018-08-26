/* eslint-disable import/first, import/extensions, no-multi-assign */

window.jQuery = window.$ = require('jquery');
require('jquery-ui-npm/jquery-ui.min.js');
require('jquery-validation');
require('bootstrap');
require('./jquery-extension');

window.moment = require('moment');
window._ = require('lodash');
window.utils = require('./helpers/utils');
window.consts = require('./helpers/consts').default;
window.config = require('./config').default;

require('fastclick').attach(document.body);

// Application styles
require('./styles/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/configureStore';
import App from './app';

const history = syncHistoryWithStore(hashHistory, store);

/**
 * Render function
 */
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history} />
      </Provider>
    </AppContainer>,
    document.getElementById('react-app')
  );
};


render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}
