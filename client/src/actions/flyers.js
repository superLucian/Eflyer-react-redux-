/* eslint-disable no-unused-vars */
import { CALL_API } from '../middleware/api';

// ======================================================================================
/**
 * loadFlyer API action
 */
export const LOAD_FLYER_REQUEST = 'LOAD_FLYER_REQUEST';
export const LOAD_FLYER_SUCCESS = 'LOAD_FLYER_SUCCESS';
export const LOAD_FLYER_FAILURE = 'LOAD_FLYER_FAILURE';

function fetchLoadFlyer() {
  return {
    [CALL_API]: {
      types: [LOAD_FLYER_REQUEST, LOAD_FLYER_SUCCESS, LOAD_FLYER_FAILURE],
      endpoint: '/flyers/autosave',
      method: 'get'
    }
  };
}

export function loadFlyer() {
  return (dispatch, getState) => {
    return dispatch(fetchLoadFlyer());
  };
}

// ======================================================================================
/**
 * createFlyer API action
 */
export const CREATE_FLYER_REQUEST = 'CREATE_FLYER_REQUEST';
export const CREATE_FLYER_SUCCESS = 'CREATE_FLYER_SUCCESS';
export const CREATE_FLYER_FAILURE = 'CREATE_FLYER_FAILURE';

function fetchCreateFlyer(data, successRedirect) {
  return {
    [CALL_API]: {
      types: [CREATE_FLYER_REQUEST, CREATE_FLYER_SUCCESS, CREATE_FLYER_FAILURE],
      endpoint: '/flyers/autosave',
      method: 'post',
      data,
      successRedirect
    }
  };
}

export function createFlyer(data, successRedirect) {
  return (dispatch, getState) => {
    return dispatch(fetchCreateFlyer(data, successRedirect));
  };
}

// ======================================================================================
/**
 * saveFlyer API action
 */
export const SAVE_FLYER_REQUEST = 'SAVE_FLYER_REQUEST';
export const SAVE_FLYER_SUCCESS = 'SAVE_FLYER_SUCCESS';
export const SAVE_FLYER_FAILURE = 'SAVE_FLYER_FAILURE';

function fetchSaveFlyer(data, successRedirect) {
  return {
    [CALL_API]: {
      types: [SAVE_FLYER_REQUEST, SAVE_FLYER_SUCCESS, SAVE_FLYER_FAILURE],
      endpoint: '/flyers/autosave',
      method: 'put',
      data,
      successRedirect
    }
  };
}

export function saveFlyer(data, successRedirect) {
  return (dispatch, getState) => {
    return dispatch(fetchSaveFlyer(data, successRedirect));
  };
}

// ======================================================================================
/**
 * Flyer UI change action
 */
export const UI_CHANGE_FLYER = 'UI_CHANGE_FLYER';

export function uiChangeFlyer(change) {
  return {
    type: UI_CHANGE_FLYER,
    change
  };
}

// ======================================================================================
/**
 * Step 1 - USE PREVIOUS FLYER / CREATE NEW FLYER action
 */
export const UI_USE_PREVIOUS_FLYER = 'UI_USE_PREVIOUS_FLYER';
export const UI_CREATE_NEW_FLYER = 'UI_CREATE_NEW_FLYER';

export function uiUsePreviousFlyer() {
  return {
    type: UI_USE_PREVIOUS_FLYER
  };
}

export function uiCreateNewFlyer() {
  return {
    type: UI_CREATE_NEW_FLYER
  };
}

// ======================================================================================
/**
 * submitFlyer API action
 */
export const SUBMIT_FLYER_REQUEST = 'SUBMIT_FLYER_REQUEST';
export const SUBMIT_FLYER_SUCCESS = 'SUBMIT_FLYER_SUCCESS';
export const SUBMIT_FLYER_FAILURE = 'SUBMIT_FLYER_FAILURE';

function fetchSubmitFlyer(successRedirect) {
  return {
    [CALL_API]: {
      types: [SUBMIT_FLYER_REQUEST, SUBMIT_FLYER_SUCCESS, SUBMIT_FLYER_FAILURE],
      endpoint: '/flyers/submit',
      method: 'get',
      successRedirect
    }
  };
}

export function submitFlyer(successRedirect) {
  return (dispatch, getState) => {
    return dispatch(fetchSubmitFlyer(successRedirect));
  };
}