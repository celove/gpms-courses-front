import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import Routes from './Routes';

import './App.css';

const App = () => (
  <div className="App container">
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/">Courses</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Hello world asd asdasdasdas dsdas das dasd asd as dsa
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
    <Routes />
  </div>
);

export default App;
