import { RECEIVE_CARDS, RECEIVE_CARD, REMOVE_CARD } from '../../actions/card_actions';
import merge from 'lodash/merge';

const cardsReducer = (state ={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CARDS:
      return action.cards;
    case RECEIVE_CARD:
      const newState = {
        [action.card.id]: action.card,
      };
      return merge({}, state, newState);
    case REMOVE_CARD:
      const deletedState = merge({}, state);
      delete deletedState[action.cardId];
      return deletedState;
    default:
      return state;
  }
};

export default cardsReducer;
