export const selectBoards = state => {
  const boards = Object.values(state.entities.boards);
  const userBoards = boards.filter(board => board.userIds.includes(state.session.currentUserId));
  return userBoards;
};


export const selectLists = (state, boardId) => {
  const lists = Object.values(state.entities.lists);
  const boardLists = lists.filter(list => list.board_id === boardId);
  const sortedBoardLists = boardLists.sort(compare);
  return sortedBoardLists;
};

export const selectCards = (state, listId) => {
  const cards = Object.values(state.entities.cards);
  const listCards = cards.filter(card => card.list_id === listId);
  const sortedListCards = listCards.sort(compare);
  return sortedListCards;
};

const compare = (a,b) => {
  if (a.position < b.position)
    return -1;
  else if (a.position > b.position)
    return 1;
  else
  return 0;
};
