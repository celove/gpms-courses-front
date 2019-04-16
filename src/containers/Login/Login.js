import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import actions from './Login.actions';

const Login = ({ signIn, isLoading, loginError }) => (
  <LoginForm
    isLoading={isLoading}
    onSubmit={signIn}
    loginError={loginError}
  />
);

const mapStateToProps = state => ({
  isLoading: state.login.isLoading,
  loginError: state.login.error,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  signIn: () => dispatch(actions.signIn(ownProps.history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
