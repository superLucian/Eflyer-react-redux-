import { combineReducers } from 'redux';
import ActionTypes from '../actions';
import { createApiReducer } from '../helpers/utils';
import Storage from '../helpers/storage';

/**
 * Reducer to store logged in user object
 */
export const user = (state = Storage.loadUser(), action) => {
  switch (action.type) {
    case ActionTypes.CHECK_USER_SUCCESS:
      Storage.saveUser(action.response && action.response.user);
      return action.response && action.response.user;
    case ActionTypes.FLUSH_USER:
      Storage.deleteUser();
      return null;
    default:
      return state;
  }
};

/**
 * Reducer to store api access token
 */
let token;
if (process.env.NODE_ENV !== 'production') {
  token = (state = Storage.loadToken(), action) => {
    switch (action.type) {
      case ActionTypes.CHECK_USER_SUCCESS:
        Storage.saveToken(action.response && action.response.token);
        return action.response && action.response.token;
      case ActionTypes.FLUSH_USER:
        Storage.deleteToken();
        return null;
      default:
        return state;
    }
  };
}
export { token };

/**
 * Reducer to store Me API status, created using generator
 */
const checkUserApi = createApiReducer([
  ActionTypes.CHECK_USER_REQUEST,
  ActionTypes.CHECK_USER_SUCCESS,
  ActionTypes.CHECK_USER_FAILURE
], false, false);


/**
 * Reducer for all authentication activities, comprised of child reducers such as user, register, login, logout, etc
 */
export default {
  auth: combineReducers({
    user,
    token,
    checkUserApi
  })
};
