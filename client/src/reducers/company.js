import { combineReducers } from 'redux';
import ActionTypes from '../actions';
import { createApiReducer } from '../helpers/utils';

/**
 * Reducer to loadCompany API status, created using generator
 */
const loadCompanyApi = createApiReducer([
  ActionTypes.LOAD_COMPANY_REQUEST,
  ActionTypes.LOAD_COMPANY_SUCCESS,
  ActionTypes.LOAD_COMPANY_FAILURE
]);

/**
 * Reducer to store company info
 */
export const info = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_COMPANY_SUCCESS:
      return action.response;
    default:
      return state;
  }
};


export default {
  company: combineReducers({
    loadCompanyApi,
    info
  })
};
