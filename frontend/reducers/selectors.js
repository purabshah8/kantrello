export const selectBoards = state => {
  const boards = Object.values(state.entities.boards);
  const userBoards = boards.filter(board => board.userIds.includes(state.session.currentUserId));
  return userBoards;
};

export const selectBoard = (state, boardId, fetchBoard) => {
  if (!state.entities.boards[boardId]) fetchBoard(boardId);
  return state.entities.boards[boardId];
};
