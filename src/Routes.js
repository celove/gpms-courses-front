import Login from './containers/Login';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
  </Switch>;
