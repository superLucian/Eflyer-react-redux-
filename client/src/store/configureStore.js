import { createStore, combineReducers,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import apiMiddleware from '../middleware/api';

import rootReducer from '../reducers';

import { checkUser } from 'actions/auth';

let middlewares;
if (process.env.NODE_ENV === 'production') {
  middlewares = applyMiddleware(
    thunk,
    apiMiddleware,
    routerMiddleware(hashHistory)
  );
} else {
  middlewares = applyMiddleware(
    thunk,
    apiMiddleware,
    routerMiddleware(hashHistory),
    loggerMiddleware
  );
}

const store = createStore(rootReducer, middlewares);
const state = store.getState();
if (!state.auth.user || !state.auth.user.enabled) {
  store.dispatch(checkUser());
}

export default store;
