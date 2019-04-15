import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as authenticationReducer } from './containers/Authentication';
import { reducer as loginReducer } from './containers/Login';

export default combineReducers({
  form: formReducer,
  auth: authenticationReducer,
  login: loginReducer,
});
