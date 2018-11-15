import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import boardsReducer from './boards_reducer';

export default combineReducers({
  users: usersReducer,
  boards: boardsReducer,
});
