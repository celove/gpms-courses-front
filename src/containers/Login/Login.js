import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm';
import actions from './Login.actions';

const Login = ({ handleSubmit, isLoading }) => (
  <LoginForm
    handleSubmit={handleSubmit}
    isLoading={isLoading}
  />
);

const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: dispatch(actions.handleSubmit),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
