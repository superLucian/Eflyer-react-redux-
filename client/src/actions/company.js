/* eslint-disable no-unused-vars */
import { CALL_API } from '../middleware/api';

// ======================================================================================
/**
 * loadCompany API action
 */
export const LOAD_COMPANY_REQUEST = 'LOAD_COMPANY_REQUEST';
export const LOAD_COMPANY_SUCCESS = 'LOAD_COMPANY_SUCCESS';
export const LOAD_COMPANY_FAILURE = 'LOAD_COMPANY_FAILURE';

function fetchLoadCompany() {
  return {
    [CALL_API]: {
      types: [LOAD_COMPANY_REQUEST, LOAD_COMPANY_SUCCESS, LOAD_COMPANY_FAILURE],
      endpoint: '/company',
      method: 'get'
    }
  };
}

export function loadCompany() {
  return (dispatch, getState) => {
    return dispatch(fetchLoadCompany());
  };
}
