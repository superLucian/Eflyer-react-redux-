import { combineReducers } from 'redux';
import ActionTypes from '../actions';
import { createApiReducer } from '../helpers/utils';
import Storage from '../helpers/storage';

/**
 * Reducer to loadFlyer API status, created using generator
 */
const loadFlyerApi = createApiReducer([
  ActionTypes.LOAD_FLYER_REQUEST,
  ActionTypes.LOAD_FLYER_SUCCESS,
  ActionTypes.LOAD_FLYER_FAILURE
]);

/**
 * Reducer to createFlyer API status, created using generator
 */
const createFlyerApi = createApiReducer([
  ActionTypes.CREATE_FLYER_REQUEST,
  ActionTypes.CREATE_FLYER_SUCCESS,
  ActionTypes.CREATE_FLYER_FAILURE
]);

/**
 * Reducer to saveFlyer API status, created using generator
 */
const saveFlyerApi = createApiReducer([
  ActionTypes.SAVE_FLYER_REQUEST,
  ActionTypes.SAVE_FLYER_SUCCESS,
  ActionTypes.SAVE_FLYER_FAILURE
]);

/**
 * Reducer to submitFlyer API status, created using generator
 */
const submitFlyerApi = createApiReducer([
  ActionTypes.SUBMIT_FLYER_REQUEST,
  ActionTypes.SUBMIT_FLYER_SUCCESS,
  ActionTypes.SUBMIT_FLYER_FAILURE
]);

/**
 * Reducer to sync with autosaved flyer data
 */
export const autosave = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FLYER_SUCCESS: case ActionTypes.CREATE_FLYER_SUCCESS: case ActionTypes.SAVE_FLYER_SUCCESS:
      return action.response;
    case ActionTypes.SUBMIT_FLYER_SUCCESS:
      return null;
    default:
      return state;
  }
};

/**
 * Reducer to flag whether any change has been made since last autosave
 */
export const changed = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FLYER_SUCCESS:
    case ActionTypes.CREATE_FLYER_SUCCESS:
    case ActionTypes.SAVE_FLYER_SUCCESS:
    case ActionTypes.SUBMIT_FLYER_SUCCESS:
      return false;
    case ActionTypes.UI_CHANGE_FLYER:
      return true;
    default:
      return state;
  }
};

/**
 * Reducer to store user-entered flyer data
 */
export const form = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FLYER_SUCCESS: case ActionTypes.CREATE_FLYER_SUCCESS:
      return action.response || {};
    case ActionTypes.SUBMIT_FLYER_SUCCESS:
      return {};
    case ActionTypes.UI_CHANGE_FLYER:
      return { ...state, ...action.change };
    default:
      return state;
  }
};

/**
 * Reducer to remember whether USE PREVIOUS FLYER or CREATE NEW FLYER was selected
 */
export const step1Action = (state = Storage.loadStep1Action(), action) => {
  switch (action.type) {
    case ActionTypes.UI_USE_PREVIOUS_FLYER:
      Storage.saveStep1Action('USE_PREVIOUS_FLYER');
      return 'USE_PREVIOUS_FLYER';
    case ActionTypes.UI_CREATE_NEW_FLYER:
      Storage.saveStep1Action('CREATE_NEW_FLYER');
      return 'CREATE_NEW_FLYER';
    default:
      return state;
  }
};

export default {
  flyers: combineReducers({
    loadFlyerApi,
    createFlyerApi,
    saveFlyerApi,
    submitFlyerApi,
    autosave,
    changed,
    form,
    step1Action
  })
};
