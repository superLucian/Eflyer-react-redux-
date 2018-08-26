/* eslint-disable no-unused-vars */
import { CALL_API } from '../middleware/api';

// ======================================================================================
/**
 * loadDesignOptions API action
 */
export const LOAD_DESIGN_OPTIONS_REQUEST = 'LOAD_DESIGN_OPTIONS_REQUEST';
export const LOAD_DESIGN_OPTIONS_SUCCESS = 'LOAD_DESIGN_OPTIONS_SUCCESS';
export const LOAD_DESIGN_OPTIONS_FAILURE = 'LOAD_DESIGN_OPTIONS_FAILURE';

function fetchLoadDesignOptions() {
  return {
    [CALL_API]: {
      types: [LOAD_DESIGN_OPTIONS_REQUEST, LOAD_DESIGN_OPTIONS_SUCCESS, LOAD_DESIGN_OPTIONS_FAILURE],
      endpoint: '/options/design',
      method: 'get'
    }
  };
}

export function loadDesignOptions() {
  return (dispatch, getState) => {
    return dispatch(fetchLoadDesignOptions());
  };
}
