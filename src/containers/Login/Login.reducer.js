import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from './Login.types';

const defaultProps = {
  isLoading: false,
  error: null,
};

export default (state = defaultProps, action) => {
  switch(action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
