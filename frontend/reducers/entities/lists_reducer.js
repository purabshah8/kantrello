import { RECEIVE_LISTS, RECEIVE_LIST, REMOVE_LIST } from '../../actions/list_actions';
import { REMOVE_CARD } from '../../actions/card_actions';
import merge from 'lodash/merge';

const listsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_LISTS:
      return merge({}, state, action.lists);
    case RECEIVE_LIST:
      newState = {
        [action.list.id]: action.list,
      };
      return merge({}, state, newState);
    case REMOVE_LIST:
      const deletedState = merge({}, state);
      delete deletedState[action.listId];
      return deletedState;
    default:
      return state;
  }
};

export default listsReducer;
