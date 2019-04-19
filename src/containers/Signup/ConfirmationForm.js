import React from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Form as RForm, Field, reduxForm } from 'redux-form';
import { func, bool, string } from 'prop-types';

import LoaderButton from '../../components/LoaderButton';

const validate = values => (values.confirmationCode && values.confirmationCode.length > 0);

const ConfirmationForm = ({ handleSubmit, submitting, invalid, isLoading, error }) => (
  <RForm onSubmit={handleSubmit}>
    {
      error &&
      <Alert variant="danger">{error}</Alert>
    }
    <Form.Group controlId="confirmationCode">
      <Form.Label>Código de Confirmação</Form.Label>
      <Field
        autoFocus
        name="confirmationCode"
        type="tel"
        component="input"
        className="form-control"
      />
      <Form.Text>Veja seu email para o código de confirmação.</Form.Text>
    </Form.Group>
    <LoaderButton
      block
      size="large"
      disabled={submitting || invalid}
      type="submit"
      isLoading={isLoading}
      text="Verificar"
      loadingText="Verificando..."
    />
  </RForm>
);

ConfirmationForm.propTypes = {
  onSubmit: func.isRequired,
  isLoading: bool.isRequired,
  confirmationError: string,
};

export default reduxForm({
  form: 'confirmationForm',
  validate,
})(ConfirmationForm);
