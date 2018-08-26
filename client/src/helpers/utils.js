import fetch from 'isomorphic-fetch';
import { LOCATION_CHANGE } from 'react-router-redux';
import numeral from 'numeral';
import consts from './consts';
import config from '../config';

export const VALID_API_METHODS = ['get', 'post', 'put', 'delete'];

/**
 * require multiple modules using Webpack's context API
 */
export const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};


/**
 * call API using isomorphic-fetch
 * @param   endpoint    API endpoint
 * @param   method      HTTP method
 * @param   data        API request body in JSON format
 * @return  promise
 */
export const callApi = (endpoint, method = 'get', data) => {

  const validateMethod = method => (VALID_API_METHODS.indexOf(method.toLowerCase()) !== -1);

  const apiUrl = endpoint.startsWith('http') || endpoint.startsWith('//') ? endpoint : config.API_URL + endpoint;

  const options = {
    method: validateMethod(method) ? method : 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(apiUrl, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject({ json, response });
      }
      return { json, response };
    });

};


/**
 * generate boilerplate API reducer
 * @param   actionTypes     Array of Request, Success and Failure action types
 * @return  reducer function
 */
export const createApiReducer = (actionTypes, storeResponse = false, resetOnLocationChange = true) => {

  if (!Array.isArray(actionTypes) || actionTypes.length !== 3) {
    throw new Error('API reducer generator: Expected an array of three action types.');
  }
  if (!actionTypes.every(type => typeof type === 'string')) {
    throw new Error('API reducer generator: Expected action types to be strings.');
  }

  const [requestType, successType, failureType] = actionTypes;

  return (state = {
    status: consts.API_NOT_LOADED,
    error: ''
  }, action) => {
    switch (action.type) {
      case requestType:
        return {
          status: consts.API_LOADING,
          error: ''
        };
      case successType:
        return storeResponse ? {
          status: consts.API_LOADED_SUCCESS,
          error: '',
          response: action.response
        } : {
          status: consts.API_LOADED_SUCCESS,
          error: ''
        };
      case failureType:
        return {
          status: consts.API_LOADED_ERROR,
          error: action.error
        };
      case LOCATION_CHANGE:
        if (resetOnLocationChange && action.payload && action.payload.action !== 'POP') {
          return {
            status: consts.API_NOT_LOADED,
            error: ''
          };
        }
        return state;
      default:
        return state;
    }
  };
};

/**
 * generate cancellable boilerplate API reducer
 * @param   actionTypes     Array of Request, Success and Failure action types
 * @return  reducer function
 */
export const createCancellableApiReducer = (actionTypes, storeResponse = false, resetOnLocationChange = true) => {

  if (!Array.isArray(actionTypes) || actionTypes.length !== 4) {
    throw new Error('API reducer generator: Expected an array of three action types.');
  }
  if (!actionTypes.every(type => typeof type === 'string')) {
    throw new Error('API reducer generator: Expected action types to be strings.');
  }

  const [requestType, successType, failureType, cancelType] = actionTypes;

  return (state = {
    status: consts.API_NOT_LOADED,
    error: '',
    actionsInProgress: []
  }, action) => {
    switch (action.type) {
      case requestType:
        return {
          status: consts.API_LOADING,
          error: '',
          actionsInProgress: state.actionsInProgress.concat(action.id)
        };
      case successType:
        if (state.actionsInProgress.indexOf(action.id) === -1) {
          return state;
        }
        return storeResponse ? {
          status: consts.API_LOADED_SUCCESS,
          error: '',
          response: action.response,
          actionsInProgress: _.without(state.actionsInProgress, action.id)
        } : {
          status: consts.API_LOADED_SUCCESS,
          error: '',
          actionsInProgress: _.without(state.actionsInProgress, action.id)
        };
      case failureType:
        if (state.actionsInProgress.indexOf(action.id) === -1) {
          return state;
        }
        return {
          status: consts.API_LOADED_ERROR,
          error: action.error,
          actionsInProgress: _.without(state.actionsInProgress, action.id)
        };
      case cancelType:
        return {
          status: consts.API_NOT_LOADED,
          error: '',
          actionsInProgress: []
        };
      case LOCATION_CHANGE:
        if (resetOnLocationChange && action.payload && action.payload.action !== 'POP') {
          return {
            status: consts.API_NOT_LOADED,
            error: '',
            actionsInProgress: []
          };
        }
        return state;
      default:
        return state;
    }
  };
};


/**
 * get product image url from a given product object
 * @param   product     object
 * @return  image url   string
 */
export const getProductImageUrl = (product) => (
  // consts.PRODUCT_IMAGE_LOCATION + (product.subId || product.supplierId) + '/' + product.partNum + '-2.jpg'
  'http://portal.edge-group.com/~edgegro1/members/marketing/img/content/103/dantona_0809-0010-2.jpg'
);


/**
 * convert price value to currency format e.g. $1,000.23
 * @param   price       value
 * @return  formatted   string
 */
export const currency = (price) => (
  numeral(price).format('$0,0.00')
);


/**
 * get product image url from a given product object
 * @param   imgUrl            string
 * @return  fixed image url   string
 */
export const localImg = (imgUrl) => {
  if (imgUrl && imgUrl.substring(0, 4).toLowerCase() !== 'http' && imgUrl.substring(0, 2) !== '//') {
    if (imgUrl[0] === '/') {
      return config.APP_BASE_URL + imgUrl.substring(1);
    }
    return config.APP_BASE_URL + imgUrl;
  }
};
