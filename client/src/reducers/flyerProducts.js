/* eslint-disable max-len */

import { combineReducers } from 'redux';
import { normalize, schema } from 'normalizr';
import ActionTypes from '../actions';
import { createApiReducer } from '../helpers/utils';

const flyerProductSchema = new schema.Entity('flyerProducts', {}, { idAttribute: 'id' });
const flyerProductListSchema = new schema.Array(flyerProductSchema);

/**
 * Reducer to store products in flyer
 */
export const pool = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FLYER_PRODUCTS_SUCCESS:
      return _.get(normalize(action.response, flyerProductListSchema), 'entities.flyerProducts', {});
    case ActionTypes.ADD_PRODUCT_TO_FLYER_SUCCESS:
    case ActionTypes.UPDATE_FLYER_PRODUCT_SUCCESS:
      return Object.assign({}, state, { [action.response.id]: action.response });
    case ActionTypes.DELETE_FLYER_PRODUCT_SUCCESS:
      return _.omit(state, action.response.id);
    default:
      return state;
  }
};

/**
 * Reducer to store loadFlyerProducts API status, created using generator
 */
const loadFlyerProductsApi = createApiReducer([
  ActionTypes.LOAD_FLYER_PRODUCTS_REQUEST,
  ActionTypes.LOAD_FLYER_PRODUCTS_SUCCESS,
  ActionTypes.LOAD_FLYER_PRODUCTS_FAILURE
]);

/**
 * Reducer to store addProductToFlyer API status, created using generator
 */
const addProductToFlyerApi = createApiReducer([
  ActionTypes.ADD_PRODUCT_TO_FLYER_REQUEST,
  ActionTypes.ADD_PRODUCT_TO_FLYER_SUCCESS,
  ActionTypes.ADD_PRODUCT_TO_FLYER_FAILURE
]);

/**
 * Reducer to store updateFlyerProduct API status, created using generator
 */
const updateFlyerProductApi = createApiReducer([
  ActionTypes.UPDATE_FLYER_PRODUCT_REQUEST,
  ActionTypes.UPDATE_FLYER_PRODUCT_SUCCESS,
  ActionTypes.UPDATE_FLYER_PRODUCT_FAILURE
]);

/**
 * Reducer to store deleteFlyerProduct API status, created using generator
 */
const deleteFlyerProductApi = createApiReducer([
  ActionTypes.DELETE_FLYER_PRODUCT_REQUEST,
  ActionTypes.DELETE_FLYER_PRODUCT_SUCCESS,
  ActionTypes.DELETE_FLYER_PRODUCT_FAILURE
]);

export default {
  flyerProducts: combineReducers({
    pool,
    loadFlyerProductsApi,
    addProductToFlyerApi,
    updateFlyerProductApi,
    deleteFlyerProductApi
  })
};
