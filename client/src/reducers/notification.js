import ActionTypes from '../actions';

/**
 * Reducer for notifications
 */
export const notifications = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.UI_PUSH_NOTIFICATION:
      return state.concat(action.notification);
    case ActionTypes.UI_POP_NOTIFICATION:
      return state.slice(1);
    default:
      return state;
  }
};

export default {
  notifications
};
