import { RECEIVE_COMMENT_ERRORS } from '../../actions/comment_actions';
import { CLEAR_ERRORS } from '../../actions/error_actions';

const commentErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors.responseText;
    case CLEAR_ERRORS:
      return [];
  default:
    return state;
  }
};

export default commentErrorsReducer;
