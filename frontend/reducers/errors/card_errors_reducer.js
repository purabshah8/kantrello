import { RECEIVE_CARD_ERRORS } from '../../actions/card_actions';
import { CLEAR_ERRORS } from '../../actions/error_actions';

const cardErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CARD_ERRORS:
      return action.errors.responseText;
    case CLEAR_ERRORS:
      return [];
  default:
    return state;
  }
};

export default cardErrorsReducer;
