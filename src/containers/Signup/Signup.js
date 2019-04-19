import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';

import ConfirmationForm from './ConfirmationForm';
import SignupForm from './SignupForm';
import { signupUser, validateUser } from './Signup.actions';

import './Signup.css';


const Signup = ({ handleSubmit, handleValidation, isLoading, isValidating }) => (
  <div className="Signup">
    {
      !isValidating ?
      <SignupForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
      /> :
      <ConfirmationForm
        onSubmit={handleValidation}
        isLoading={isLoading}
      />
    }
  </div>
);

const mapStateToProps = (store) => ({
  registeringUser: get(store, 'signup.user'),
  isValidating: get(store, 'signup.isValidating'),
  isLoading: get(store, 'signup.isLoading'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleSubmit: values => dispatch(signupUser(values)),
  handleValidation: values => dispatch(validateUser(values, ownProps.history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
