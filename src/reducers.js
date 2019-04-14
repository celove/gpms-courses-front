import { combineReducers } from 'redux';

import { reducer as authenticationReducer } from './containers/Authentication';

export default combineReducers({
  auth: authenticationReducer,
});
