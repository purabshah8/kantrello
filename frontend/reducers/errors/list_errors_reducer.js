import { RECEIVE_LIST_ERRORS } from '../../actions/list_actions';
import { CLEAR_ERRORS } from '../../actions/error_actions';

const listErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIST_ERRORS:
      return action.errors.responseText;
    case CLEAR_ERRORS:
      return [];
  default:
    return state;
  }
};

export default listErrorsReducer;
