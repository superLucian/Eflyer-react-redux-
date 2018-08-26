import { combineReducers } from 'redux';
import ActionTypes from '../actions';
import { createApiReducer } from '../helpers/utils';

/**
 * Reducer to loadSuppliers API status, created using generator
 */
const loadSuppliersApi = createApiReducer([
  ActionTypes.LOAD_SUPPLIERS_REQUEST,
  ActionTypes.LOAD_SUPPLIERS_SUCCESS,
  ActionTypes.LOAD_SUPPLIERS_FAILURE
]);

/**
 * Reducer to store suppliers
 */
export const suppliers = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_SUPPLIERS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default {
  suppliers: combineReducers({
    loadSuppliersApi,
    suppliers,
  })
};
