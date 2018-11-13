import { combineReducers } from 'redux';
import userErrorsReducer from './user_errors_reducer';
import sessionErrorsReducer from './session_errors_reducer';

export default combineReducers({
  user: userErrorsReducer,
  session: sessionErrorsReducer,
});
