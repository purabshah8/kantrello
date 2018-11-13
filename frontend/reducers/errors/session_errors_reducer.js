import { RECEIVE_SESSION_ERRORS } from '../../actions/user_actions';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors.responseJSON;
  default:
    return state;
  }
};

export default sessionErrorsReducer;
