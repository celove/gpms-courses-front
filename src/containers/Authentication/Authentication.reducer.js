import { AUTH_USER_LOGIN } from './Authentication.actions';

const defaultState = {
  user: null,
  userForm: null,
  error: null,
  isLoading: null,
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'TEST':
      return {
        ...state,
        name: 'New User!',
      }
    default:
      return state;
  }
};