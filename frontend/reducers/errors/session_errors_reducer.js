import { RECEIVE_SESSION_ERRORS } from '../../actions/user_actions';
import { CLEAR_ERRORS } from '../../actions/error_actions';


const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors.responseJSON;
    case CLEAR_ERRORS:
      return [];
  default:
    return state;
  }
};

export default sessionErrorsReducer;
