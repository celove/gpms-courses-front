import { AUTH_USER_LOGIN } from './Authentication.actions';

const defaultState = {
  user: null,
  error: null,
  loading: null,
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