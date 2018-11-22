import { RECEIVE_CARDS, RECEIVE_CARD, REMOVE_CARD } from '../../actions/card_actions';
import { RECEIVE_COMMENT } from '../../actions/comment_actions';
import merge from 'lodash/merge';

const cardsReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CARDS:
      return merge({}, state, action.cards);
    case RECEIVE_CARD:
      newState = {
        [action.card.id]: action.card,
      };
      return merge({}, state, newState);
    case REMOVE_CARD:
      const deletedState = merge({}, state);
      delete deletedState[action.cardId];
      return deletedState;

    case RECEIVE_COMMENT:
      newState = merge({}, state);
      newState[action.comment.card_id].commentIds.push(action.comment.id);
      return newState;
    default:
      return state;
  }
};

export default cardsReducer;
