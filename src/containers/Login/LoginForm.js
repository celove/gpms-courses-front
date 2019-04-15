import React from 'react';
import Form from 'react-bootstrap/Form';
import { Field, reduxForm } from 'redux-form';

import './LoginForm.css';
import LoaderButton from '../../components/LoaderButton';

const validateForm = values => {
  return (values.email && values.email.length > 0) &&
    (values.password && values.password.lenght > 0);
};

const LoginForm = ({ handleSubmit, isLoading, invalid, submitting }) => (
  <div className="Login">
    <form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Field
          name="email"
          component={Form.Control}
          autoFocus
          type="email"
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
        />
      </Form.Group>
      <LoaderButton
        block
        size="lg"
        disabled={submitting || invalid}
        type="submit"
        isLoading={isLoading}
        text="Login"
        loadingText="Logando..."
      />
    </form>
  </div>
);

export default reduxForm({
  form: 'login',
  validate: validateForm,
})(LoginForm);
