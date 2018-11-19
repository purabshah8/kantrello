export const selectBoards = state => {
  const boards = Object.values(state.entities.boards);
  const userBoards = boards.filter(board => board.userIds.includes(state.session.currentUserId));
  return userBoards;
};


export const selectLists = (state, boardId) => {
  const lists = Object.values(state.entities.lists);
  const boardLists = lists.filter(list => list.board_id === boardId);
  return boardLists;
};
