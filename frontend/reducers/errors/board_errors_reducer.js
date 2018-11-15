import { RECEIVE_BOARD_ERRORS } from '../../actions/board_actions';
import { CLEAR_ERRORS } from '../../actions/error_actions';

const boardErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARD_ERRORS:
      return action.errors.responseJSON;
    case CLEAR_ERRORS:
      return [];
  default:
    return state;
  }
};

export default boardErrorsReducer;
