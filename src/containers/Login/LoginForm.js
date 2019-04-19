import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Form as RForm, Field, reduxForm } from 'redux-form';
import { func, bool, string } from 'prop-types';
import './LoginForm.css';
import LoaderButton from '../../components/LoaderButton';

const validateForm = values => {
  return (values.email && values.email.length > 0) &&
    (values.password && values.password.lenght > 0);
};

const LoginForm = ({ handleSubmit, isLoading, invalid, submitting, loginError }) => (
  <div className="Login">
    <RForm onSubmit={handleSubmit}>
      {
        loginError &&
        <Alert variant="danger">{loginError}</Alert>
      }
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Field
          name="email"
          type="email"
          component="input"
          className="form-control"
          autoFocus
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Field
          name="password"
          type="password"
          component="input"
          className="form-control"
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
    </RForm>
  </div>
);

LoginForm.propTypes = {
  onSubmit: func.isRequired,
  isLoading: bool.isRequired,
  loginError: string,
};

export default reduxForm({
  form: 'login',
  validate: validateForm,
})(LoginForm);
