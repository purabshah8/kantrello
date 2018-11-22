import { RECEIVE_COMMENTS, RECEIVE_COMMENT, REMOVE_COMMENT } from '../../actions/comment_actions';
import { RECEIVE_CARD } from '../../actions/card_actions';
import merge from 'lodash/merge';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CARD:
    case RECEIVE_COMMENTS:
      return merge({}, state, action.comments);
    case RECEIVE_COMMENT:
      const newState = {
        [action.comment.id]: action.comment,
      };
      return merge({}, state, newState);
    case REMOVE_COMMENT:
      const deletedState = merge({}, state);
      delete deletedState[action.commentId];
      return deletedState;
    default:
      return state;
  }
};

export default commentsReducer;
