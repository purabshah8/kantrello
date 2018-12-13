import { RECEIVE_CARDS, RECEIVE_CARD, REMOVE_CARD } from '../../actions/card_actions';
import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comment_actions';
import merge from 'lodash/merge';

const cardsReducer = (state = {}, action) => {
  let newState;
  let commentsIdsArray;
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
      delete deletedState[action.id];
      return deletedState;

    case RECEIVE_COMMENT:
      newState = merge({}, state);
      commentsIdsArray = newState[action.comment.card_id].commentIds;
      if (!commentsIdsArray.includes(action.comment.id))
        newState[action.comment.card_id].commentIds.push(action.comment.id);
      return newState;
    case REMOVE_COMMENT:
      newState = merge({}, state);
      commentsIdsArray = newState[action.comment.card_id].commentIds;
      newState[action.comment.card_id].commentIds.splice(commentsIdsArray.indexOf(action.comment.id), 1);
      return newState;
    default:
      return state;
  }
};

export default cardsReducer;
