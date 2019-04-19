import { AUTH_USER_SET } from './Authentication.types';

export const setUser = user => ({
  type: AUTH_USER_SET,
  user,
});
