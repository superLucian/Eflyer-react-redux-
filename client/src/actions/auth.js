/* eslint-disable no-unused-vars */
import { CALL_API } from '../middleware/api';
import { routerActions } from 'react-router-redux';

// ======================================================================================
/**
 * checkUser API action
 */
export const CHECK_USER_REQUEST = 'CHECK_USER_REQUEST';
export const CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
export const CHECK_USER_FAILURE = 'CHECK_USER_FAILURE';

function fetchCheckUser() {
  return {
    [CALL_API]: {
      types: [CHECK_USER_REQUEST, CHECK_USER_SUCCESS, CHECK_USER_FAILURE],
      endpoint: '/auth/check-user',
      method: 'get'
    }
  };
}

export function checkUser() {
  return (dispatch, getState) => {
    return dispatch(fetchCheckUser());
  };
}


// ======================================================================================
/**
 * flushUser API action
 */
export const FLUSH_USER = 'FLUSH_USER';
export function flushUser() {
  return {
    type: FLUSH_USER
  };
}
