import * as BoardApiUtil from '../util/board_api_util';

export const RECEIVE_BOARDS = 'RECEIVE_BOARDS';
export const RECEIVE_BOARD = 'RECEIVE_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';
export const RECEIVE_BOARD_ERRORS = 'RECEIVE_BOARD_ERRORS';

export const receiveBoards = boards => {
  return {
    type: RECEIVE_BOARDS,
    boards
  };
};

export const receiveBoard = board => {
  return {
    type: RECEIVE_BOARD,
    board,
  };
};

export const removeBoard = id => {
  return {
    type: REMOVE_BOARD,
    boardId: id,
  };
};

export const receiveBoardErrors = errors => {
  return {
    type: RECEIVE_BOARD_ERRORS,
    errors,
  };
};

export const fetchBoards = id => dispatch => {
  return BoardApiUtil.fetchBoards(id).then(
    boards => dispatch(receiveBoards(boards)),
    errors => dispatch(receiveBoardErrors(errors))
  );
};

export const fetchBoard = id => dispatch => {
  return BoardApiUtil.fetchBoard(id).then(
    board => dispatch(receiveBoard(board)),
    errors => dispatch(receiveBoardErrors(errors))
  );
};

export const createBoard =  board => dispatch => {
  return BoardApiUtil.createBoard(board).then(
    newBoard => dispatch(receiveBoard(newBoard)),
    errors => dispatch(receiveBoardErrors(errors))
  );
};

export const updateBoard =  board => dispatch => {
  return BoardApiUtil.updateBoard(board).then(
    updatedBoard => dispatch(receiveBoard(updatedBoard)),
    errors => dispatch(receiveBoardErrors(errors))
  );
};

export const deleteBoard = id => dispatch => {
  return BoardApiUtil.deleteBoard(id).then(
    board => dispatch(removeBoard(board.id)),
    errors => dispatch(receiveBoardErrors(errors))
  );
};

export const createBoardShare =  boardShare => dispatch => {
  return BoardApiUtil.createBoardShare(boardShare).then(
    newBoard => dispatch(receiveBoard(newBoard)),
    errors => dispatch(receiveBoardErrors(errors))
  );
};

export const deleteBoardShare =  boardShareId => dispatch => {
  return BoardApiUtil.deleteBoardShare(boardShareId).then(
    newBoard => dispatch(receiveBoard(newBoard)),
    errors => dispatch(receiveBoardErrors(errors))
  );
};
