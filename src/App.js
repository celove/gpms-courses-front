import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer }from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';

import Routes from './Routes';

import './App.css';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  handleLogout = async () => {
    await Auth.signOut();
  
    this.userHasAuthenticated(false);
    this.props.history.push('/');
  }
  

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }
  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar collapseOnSelect>
          <Navbar.Brand>
            <Link to="/">Courses</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
            {
              this.state.isAuthenticated
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

export default withRouter(App);
