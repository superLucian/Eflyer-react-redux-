/* eslint-disable no-unused-vars */
import { CALL_API } from '../middleware/api';

// ======================================================================================
/**
 * searchProductsAPI action
 */
export const SEARCH_PRODUCTS_REQUEST = 'SEARCH_PRODUCTS_REQUEST';
export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';
export const SEARCH_PRODUCTS_FAILURE = 'SEARCH_PRODUCTS_FAILURE';
export const SEARCH_PRODUCTS_CANCEL = 'SEARCH_PRODUCTS_CANCEL';

function fetchSearchProducts(supplierId, partNum) {
  return {
    [CALL_API]: {
      types: [SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS, SEARCH_PRODUCTS_FAILURE],
      endpoint: `/products?supplierId=${supplierId}&partNum=${partNum}`,
      method: 'get',
      id: Date.now() + Math.random()
    }
  };
}

export function searchProducts(supplierId, partNum) {
  return (dispatch, getState) => {
    return dispatch(fetchSearchProducts(supplierId, partNum));
  };
}

export function cancelSearchProducts() {
  return { type: SEARCH_PRODUCTS_CANCEL };
}

// ======================================================================================
/**
 * UI Product form change action
 */
export const UI_PRODUCT_FORM_CHANGE = 'UI_PRODUCT_FORM_CHANGE';

export function uiChangeProductForm(change) {
  return {
    type: UI_PRODUCT_FORM_CHANGE,
    change
  };
}

// ======================================================================================
/**
 * UI Select product to add action
 */
export const UI_SELECT_PRODUCT_TO_ADD = 'UI_SELECT_PRODUCT_TO_ADD';

export function uiSelectProductToAdd(product) {
  return {
    type: UI_SELECT_PRODUCT_TO_ADD,
    product
  };
}

// ======================================================================================
/**
 * UI Select product to edit action
 */
export const UI_SELECT_PRODUCT_TO_EDIT = 'UI_SELECT_PRODUCT_TO_EDIT';

export function uiSelectProductToEdit(flyerProduct) {
  return {
    type: UI_SELECT_PRODUCT_TO_EDIT,
    flyerProduct
  };
}
