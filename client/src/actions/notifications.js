/* eslint-disable no-unused-vars */

// ======================================================================================
/**
 * showNotification action
 */
export const UI_PUSH_NOTIFICATION = 'UI_PUSH_NOTIFICATION';
export const UI_POP_NOTIFICATION = 'UI_POP_NOTIFICATION';

export function showNotification(text, type = 'default', ttl) {
  return (dispatch, getState) => {

    const notification = {
      text,
      type
    };
    const _ttl = ttl || (type === 'fail' ? consts.NOTIFICATION_TTL * 2 : consts.NOTIFICATION_TTL);

    dispatch({type: UI_PUSH_NOTIFICATION, notification});

    setTimeout(() => {
      dispatch({type: UI_POP_NOTIFICATION});
    }, _ttl);

  };
}
