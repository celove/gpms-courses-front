import { SubmissionError } from 'redux-form';
import { Auth } from 'aws-amplify';

import { SIGNUP_LOADING, SIGNUP_FINISH, SIGNUP_USER_VALIDATION } from './Signup.types';
import { setUser } from '../Authentication/Authentication.actions';

const startLoading = {
  type: SIGNUP_LOADING,
};

const finishLoading = {
  type: SIGNUP_FINISH
};

const setUserValidation = user => ({
  type: SIGNUP_USER_VALIDATION,
  user,
});

export const signupUser = values => async dispatch =>{
  const { email, password, name } = values;
  dispatch(startLoading);

  try {
    await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        name,
      },
    });
    dispatch(setUserValidation);
  } catch (e) {
    if (e.code === 'UsernameExistsException') {
      try {
        await Auth.resendSignUp(email);
        const userInfo = {
          email,
          password,
        }
        dispatch(setUserValidation(userInfo));
      } catch (error) {
        throw new SubmissionError({
          _error: e.message
        });
      }
    } else {
      throw new SubmissionError({
        _error: e.message
      });
    }
  } finally {
    dispatch(finishLoading);
  }
};

export const validateUser = (values, history) => async (dispatch, getState) => {
  const { confirmationCode } = values;

  const { email, password } = getState().signup.user;

  dispatch(startLoading);

  try {
    await Auth.confirmSignUp(email, confirmationCode);
    const user = await Auth.signIn(email, password);

    dispatch(setUser(user.user));

    history.push('/');
  } catch (e) {
    console.log(e);
    history.push('/login');
    throw new SubmissionError({
      _error: e.message
    });
  } finally {
    dispatch(finishLoading);
  }
};
