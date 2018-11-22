import { combineReducers } from 'redux';
import userErrorsReducer from './user_errors_reducer';
import sessionErrorsReducer from './session_errors_reducer';
import boardErrorsReducer from './board_errors_reducer';
import listErrorsReducer from './list_errors_reducer';
import cardErrorsReducer from './card_errors_reducer';
import commentErrorsReducer from './comment_errors_reducer';

export default combineReducers({
  user: userErrorsReducer,
  board: boardErrorsReducer,
  list: listErrorsReducer,
  card: cardErrorsReducer,
  comment: commentErrorsReducer,
  session: sessionErrorsReducer,
});
