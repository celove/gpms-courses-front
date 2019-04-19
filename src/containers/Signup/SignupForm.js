import React from 'react';
import { Form as RForm, Field, reduxForm } from 'redux-form';
import { func, bool } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import get from 'lodash/get';

import LoaderButton from '../../components/LoaderButton';

const validateForm = values => {
  const errors = {};

  const name = get(values, 'name');
  if (!name || (name.length < 1)) {
    errors.name = 'Nome é obrigatório';
  }

  const email = get(values, 'email');
  if (!email || (email.length < 1)) {
    errors.email = 'Email é obrigatório';
  }

  const password = get(values, 'password');
  if (!password || (password.length < 1)) {
    errors.password = 'Senha é obrigatória';
  }

  const confirmPassword = get(values, 'confirmPassword');
  if (password !== confirmPassword) {
    errors.confirmPassword = 'As senhas não são iguais!';
  }
  return errors;
}

const getClassName = (touched, error) => {
  const defaultClass = 'form-control';
  if (touched) {
    if (error) {
      return `${defaultClass} is-invalid`
    }
    return `${defaultClass} is-valid`
  }
  return defaultClass;
};

const renderField = ({ input, label, type = 'text', meta: { touched, error, warning } }) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <input
      {...input}
      type={type}
      component="input"
      className={getClassName(touched, error)}
    />
    {
      touched && error &&
      <Alert variant="danger">{error}</Alert>
    }
  </Form.Group>
);

const SignupForm = ({ handleSubmit, error, invalid, submitting, isLoading }) => (
  <RForm onSubmit={handleSubmit}>
    {
      error &&
      <Alert variant="danger">{error}</Alert>
    }

    <Field name="name" label="Nome" component={renderField} />

    <Field name="email" label="Email" type="email" component={renderField} />

    <Field name="password" label="Senha" type="password" component={renderField} />

    <Field name="confirmPassword" label="Confirmar Senha" type="password" component={renderField} />

    <LoaderButton
      block
      size="large"
      disabled={invalid || submitting}
      type="submit"
      isLoading={isLoading}
      text="Cadastrar"
      loadingText="Cadastrando..."
    />
  </RForm>
);

SignupForm.propTypes = {
  onSubmit: func.isRequired,
  isLoading: bool.isRequired,
};

export default reduxForm({
  form: 'signupForm',
  validate: validateForm,
})(SignupForm);
