import { AUTH_USER_SET } from './Authentication.types';

const defaultState = {
  user: null,
  userForm: null,
  error: null,
  isLoading: null,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case AUTH_USER_SET:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state;
  }
};