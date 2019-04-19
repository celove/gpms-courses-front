import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer }from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { activateUser, deactivateUser, finishUserAuthenticating } from './containers/Authentication';
import Routes from './Routes';

import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      const user = await Auth.currentSession();
      console.log(user);
      this.props.authenticateUser();
    }
    catch(e) {
      console.log(e);
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.props.finishAuthenticating();
  }

  handleLogout = async () => {
    await Auth.signOut();
  
    this.props.logoutUser();
    this.props.history.push('/');
  }
  
  render() {
    const childProps = {
      isAuthenticated: this.props.isAuthenticated,
      // userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.props.isAuthenticating &&
      <div className="App container">
        <Navbar collapseOnSelect>
          <Navbar.Brand>
            <Link to="/">Courses</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
            {
              this.props.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>
                  <NavLink>Logout</NavLink>
                </NavItem>
              : <Fragment>
                    <NavItem>
                      <LinkContainer to="/signup">
                        <NavLink>Signup</NavLink>
                      </LinkContainer>
                    </NavItem>
                    <NavItem>
                      <LinkContainer to="/login">
                        <NavLink>Login</NavLink>
                      </LinkContainer>
                    </NavItem>
                </Fragment>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: get(state, 'auth.isAuthenticated'),
  isAuthenticating: get(state, 'auth.isAuthenticating'),
});

const mapDispatchToProps = dispatch => ({
  authenticateUser: () => dispatch(activateUser),
  logoutUser: () => dispatch(deactivateUser),
  finishAuthenticating: () => dispatch(finishUserAuthenticating),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
