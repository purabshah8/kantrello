export const selectBoards = state => {
  const boards = Object.values(state.entities.boards);
  const userBoards = boards.filter(board => board.userIds.includes(state.session.currentUserId));
  return userBoards;
};
