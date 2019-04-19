import {
    AUTH_USER_SET,
    AUTH_USER_ACTIVATE,
    AUTH_USER_DEACTIVATE,
    AUTH_FINISH_AUTHENTICATING
} from './Authentication.types';

const defaultState = {
  user: null,
  isAuthenticated: false,
  isAuthenticating: true,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case AUTH_USER_SET:
      return {
        ...state,
        user: action.user,
      }
    case AUTH_USER_ACTIVATE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTH_USER_DEACTIVATE:
      return {
        ...state,
        isAuthenticated: false,
      };
    case AUTH_FINISH_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: false,
      };
    default:
      return state;
  }
};