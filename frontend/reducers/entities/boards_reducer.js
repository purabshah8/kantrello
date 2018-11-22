import { RECEIVE_BOARDS, RECEIVE_BOARD, REMOVE_BOARD } from '../../actions/board_actions';
import merge from 'lodash/merge';

const boardsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BOARDS:
      return action.boards;
    case RECEIVE_BOARD:
      const copiedState = merge({}, state);
      delete copiedState[action.board.id];
      const newState = {
        [action.board.id]: action.board,
      };
      debugger
      return merge({}, copiedState, newState);
    case REMOVE_BOARD:
      const deletedState = merge({}, state);
      delete deletedState[action.boardId];
      return deletedState;
    default:
      return state;
  }
};

export default boardsReducer;
