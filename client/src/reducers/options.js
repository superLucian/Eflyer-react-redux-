import { combineReducers } from 'redux';
import ActionTypes from '../actions';
import { createApiReducer } from '../helpers/utils';

/**
 * Reducer to loadDesignOptions API status, created using generator
 */
const loadDesignOptionsApi = createApiReducer([
  ActionTypes.LOAD_DESIGN_OPTIONS_REQUEST,
  ActionTypes.LOAD_DESIGN_OPTIONS_SUCCESS,
  ActionTypes.LOAD_DESIGN_OPTIONS_FAILURE
]);

/**
 * Reducer to store design options
 */
export const designOptions = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_DESIGN_OPTIONS_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

export default {
  options: combineReducers({
    loadDesignOptionsApi,
    designOptions,
  })
};
