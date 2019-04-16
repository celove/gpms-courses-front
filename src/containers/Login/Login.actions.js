import { Auth } from 'aws-amplify';
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from './Login.types';
import { AUTH_USER_SET } from '../Authentication';

const startLoading = {
  type: LOGIN_LOADING,
};


const loginSuccess = {
  type: LOGIN_SUCCESS,
};

const loginError = error => ({
  type: LOGIN_ERROR,
  error,
});

const setUser = user => ({
  type: AUTH_USER_SET,
  user,
});

const signIn = history => async (dispatch, getState) => {
  console.log(history);
  
  const { email, password } = getState().form.login.values;
  
  try {
    dispatch(startLoading);
    const user = await Auth.signIn(email, password);
    dispatch(loginSuccess);
    dispatch(setUser(user));
    history.push('/');
  } catch (e) {
    console.log(e);
    dispatch(loginError(e.message));
  }
};

export default {
  signIn,
};
