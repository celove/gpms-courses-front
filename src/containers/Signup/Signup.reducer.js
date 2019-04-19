import { SIGNUP_LOADING, SIGNUP_FINISH, SIGNUP_USER_VALIDATION } from './Signup.types';

const defaultProps = {
  isLoading: false,
  isValidating: false,
  user: null,
};

export default (state = defaultProps, action) => {
  switch(action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_FINISH:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_USER_VALIDATION:
      return {
        ...state,
        isLoading: false,
        isValidating: true,
        user: action.user,
      };
    default:
      return state;
  }
};
