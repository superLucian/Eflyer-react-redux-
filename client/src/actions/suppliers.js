/* eslint-disable no-unused-vars */
import { CALL_API } from '../middleware/api';

// ======================================================================================
/**
 * loadSuppliers API action
 */
export const LOAD_SUPPLIERS_REQUEST = 'LOAD_SUPPLIERS_REQUEST';
export const LOAD_SUPPLIERS_SUCCESS = 'LOAD_SUPPLIERS_SUCCESS';
export const LOAD_SUPPLIERS_FAILURE = 'LOAD_SUPPLIERS_FAILURE';

function fetchLoadSuppliers() {
  return {
    [CALL_API]: {
      types: [LOAD_SUPPLIERS_REQUEST, LOAD_SUPPLIERS_SUCCESS, LOAD_SUPPLIERS_FAILURE],
      endpoint: '/suppliers',
      method: 'get'
    }
  };
}

export function loadSuppliers() {
  return (dispatch, getState) => {
    return dispatch(fetchLoadSuppliers());
  };
}
