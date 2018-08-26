import store from '../store/configureStore';

export default function (nextState, replace) {
  const state = store.getState();

  if (!state.auth.user) {
    replace({
      pathname: '/login-required',
      state: { redirect: nextState.location.pathname + nextState.location.search }
    });
    return false;
  }

  return true;
}
