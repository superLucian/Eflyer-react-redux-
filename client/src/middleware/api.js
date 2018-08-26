import { routerActions } from 'react-router-redux';
import { callApi } from '../helpers/utils';
import { flushUser } from '../actions/auth';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('CALL API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => (action) => {
  const apiParams = action[CALL_API];
  if (typeof apiParams === 'undefined') {
    return next(action);
  }

  let { endpoint } = apiParams;
  const { types, method, data, successRedirect, failureRedirect, id } = apiParams;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('API middleware: Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('API middleware: Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('API middleware: Expected action types to be strings.');
  }

  function actionWith(nextActionData) {
    const finalAction = Object.assign({}, action, nextActionData);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType, endpoint, method, data, id }));

  return callApi(endpoint, method, data).then(
    ({ json }) => {
      next(actionWith({
        type: successType,
        response: json,
        id
      }));
      successRedirect && store.dispatch(routerActions.push(successRedirect));
      return json;
    },
    ({ json, response }) => {
      failureRedirect && store.dispatch(routerActions.push(failureRedirect));
      // Redirect before FAILURE action dispatch to allow error notification
      next(actionWith({
        type: failureType,
        error: json,
        // error: error.message || 'Something went wrong'
        id
      }));
      if (response && response.status && response.status === 401) {
        if (store.getState().auth.user) {
          store.dispatch(flushUser());
          store.dispatch(routerActions.push('/session-expired'));
        }
      }
      return Promise.reject(json); // Commented because it causes `Uncaught (in promise)`
    }
  );
};
