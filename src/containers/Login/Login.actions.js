import { Auth } from 'aws-amplify';
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS } from './Login.types';
import { activateUser } from '../Authentication/Authentication.actions';

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


const signIn = history => async (dispatch, getState) => {
  console.log(history);
  
  const { email, password } = getState().form.login.values;
  
  try {
    dispatch(startLoading);
    await Auth.signIn(email, password);
    dispatch(loginSuccess);
    dispatch(activateUser);
    history.push('/');
  } catch (e) {
    console.log(e);
    dispatch(loginError(e.message));
  }
};

export default {
  signIn,
};
