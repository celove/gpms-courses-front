import {
  AUTH_USER_SET,
  AUTH_USER_ACTIVATE,
  AUTH_USER_DEACTIVATE,
  AUTH_FINISH_AUTHENTICATING
} from './Authentication.types';

export const setUser = user => ({
  type: AUTH_USER_SET,
  user,
});

export const activateUser = {
  type: AUTH_USER_ACTIVATE,
};

export const deactivateUser = {
  type: AUTH_USER_DEACTIVATE,
};

export const finishUserAuthenticating = {
  type: AUTH_FINISH_AUTHENTICATING,
};
