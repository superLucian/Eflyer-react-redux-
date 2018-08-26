/* eslint-disable no-unused-vars */
import { CALL_API } from '../middleware/api';

// ======================================================================================
/**
 * loadFlyerProducts API action
 */
export const LOAD_FLYER_PRODUCTS_REQUEST = 'LOAD_FLYER_PRODUCTS_REQUEST';
export const LOAD_FLYER_PRODUCTS_SUCCESS = 'LOAD_FLYER_PRODUCTS_SUCCESS';
export const LOAD_FLYER_PRODUCTS_FAILURE = 'LOAD_FLYER_PRODUCTS_FAILURE';

function fetchLoadFlyerProducts(flyerId) {
  return {
    [CALL_API]: {
      types: [LOAD_FLYER_PRODUCTS_REQUEST, LOAD_FLYER_PRODUCTS_SUCCESS, LOAD_FLYER_PRODUCTS_FAILURE],
      endpoint: '/flyer-products?flyer=' + flyerId,
      method: 'get'
    }
  };
}

export function loadFlyerProducts(flyerId) {
  return (dispatch, getState) => {
    return dispatch(fetchLoadFlyerProducts(flyerId));
  };
}

// ======================================================================================
/**
 * addProductToFlyer API action
 */
export const ADD_PRODUCT_TO_FLYER_REQUEST = 'ADD_PRODUCT_TO_FLYER_REQUEST';
export const ADD_PRODUCT_TO_FLYER_SUCCESS = 'ADD_PRODUCT_TO_FLYER_SUCCESS';
export const ADD_PRODUCT_TO_FLYER_FAILURE = 'ADD_PRODUCT_TO_FLYER_FAILURE';

function fetchAddProductToFlyer(flyerId, data) {
  return {
    [CALL_API]: {
      types: [ADD_PRODUCT_TO_FLYER_REQUEST, ADD_PRODUCT_TO_FLYER_SUCCESS, ADD_PRODUCT_TO_FLYER_FAILURE],
      endpoint: '/flyer-products?flyer=' + flyerId,
      method: 'post',
      data
    }
  };
}

export function addProductToFlyer(flyerId, data) {
  return (dispatch, getState) => {
    return dispatch(fetchAddProductToFlyer(flyerId, data));
  };
}

// ======================================================================================
/**
 * updateFlyerProduct API action
 */
export const UPDATE_FLYER_PRODUCT_REQUEST = 'UPDATE_FLYER_PRODUCT_REQUEST';
export const UPDATE_FLYER_PRODUCT_SUCCESS = 'UPDATE_FLYER_PRODUCT_SUCCESS';
export const UPDATE_FLYER_PRODUCT_FAILURE = 'UPDATE_FLYER_PRODUCT_FAILURE';

function fetchUpdateFlyerProduct(flyerProductId, data) {
  return {
    [CALL_API]: {
      types: [UPDATE_FLYER_PRODUCT_REQUEST, UPDATE_FLYER_PRODUCT_SUCCESS, UPDATE_FLYER_PRODUCT_FAILURE],
      endpoint: '/flyer-products/' + flyerProductId,
      method: 'put',
      data
    }
  };
}

export function updateFlyerProduct(flyerProductId, data) {
  return (dispatch, getState) => {
    return dispatch(fetchUpdateFlyerProduct(flyerProductId, data));
  };
}

// ======================================================================================
/**
 * deleteFlyerProduct API action
 */
export const DELETE_FLYER_PRODUCT_REQUEST = 'DELETE_FLYER_PRODUCT_REQUEST';
export const DELETE_FLYER_PRODUCT_SUCCESS = 'DELETE_FLYER_PRODUCT_SUCCESS';
export const DELETE_FLYER_PRODUCT_FAILURE = 'DELETE_FLYER_PRODUCT_FAILURE';

function fetchDeleteFlyerProduct(flyerProductId) {
  return {
    [CALL_API]: {
      types: [DELETE_FLYER_PRODUCT_REQUEST, DELETE_FLYER_PRODUCT_SUCCESS, DELETE_FLYER_PRODUCT_FAILURE],
      endpoint: '/flyer-products/' + flyerProductId,
      method: 'delete'
    }
  };
}

export function deleteFlyerProduct(flyerProductId) {
  return (dispatch, getState) => {
    return dispatch(fetchDeleteFlyerProduct(flyerProductId));
  };
}
