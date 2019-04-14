import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Auth } from 'aws-amplify';

import LoaderButton from '../../components/LoaderButton';
import './Signup.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
      error: null,
    };
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      error: null,
    });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          name: this.state.name,
        },
      });
      this.setState({
        newUser
      });
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        Auth.resendSignUp(this.state.email);
        this.setState({
          newUser: 'tempUser',
        });
      } else {
        this.setState({ error: e.message });
      }
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      error: null,
    });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    } catch (e) {
      this.setState({ error: e.message });
    }
    this.setState({ isLoading: false });
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        {
          this.state.error &&
          <Alert variant="danger">{this.state.error}</Alert>
        }
        <Form.Group controlId="confirmationCode">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <Form.Text>Veja seu email para o código de confirmação.</Form.Text>
        </Form.Group>
        <LoaderButton
          block
          size="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verificar"
          loadingText="Verificando..."
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        {
          this.state.error &&
          <Alert variant="danger">{this.state.error}</Alert>
        }
        <Form.Group controlId="name">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            autoFocus
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirmar Senha</Form.Label>
          <Form.Control
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <LoaderButton
          block
          size="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Cadastrar"
          loadingText="Cadastrando..."
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
