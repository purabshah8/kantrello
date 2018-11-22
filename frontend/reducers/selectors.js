export const selectBoards = state => {
  const boards = Object.values(state.entities.boards);
  const userBoards = boards.filter(board => {
    return board.userIds.includes(state.session.currentUserId) || board.owner_id === state.session.currentUserId;
  });
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

export const selectCardList = (state, cardId) => {
  const card = state.entities.cards[cardId];
  return (Object.keys(state.entities.lists).length === 0) ? null : state.entities.lists[card.list_id];
};

export const selectComments = (state, cardId) => {
  const card = state.entities.cards[cardId];
  const comments = Object.values(state.entities.comments);
  const selectedComments = (comments.length === 0) ? null : comments.filter(comment => {
    return (card.commentIds.includes(comment.id));
  });
  return selectedComments;
};

export const selectBoardUsers = (state, boardId) => {
  const users = Object.values(state.entities.users);
  const board = state.entities.boards[boardId];
  const boardUsers = users.filter(user => board.userIds.includes(user.id));
  return boardUsers;
};

const compare = (a,b) => {
  if (a.position < b.position)
    return -1;
  else if (a.position > b.position)
    return 1;
  else
  return 0;
};
