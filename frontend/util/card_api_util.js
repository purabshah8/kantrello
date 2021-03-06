export const fetchCards = listId => {
  return $.ajax({
    method: "GET",
    url: `/api/lists/${listId}/cards`
  });
};

export const fetchCard = id => {
  return $.ajax({
    method: "GET",
    url: `/api/cards/${id}`
  });
};

export const createCard = card => {
  return $.ajax({
    method: "POST",
    url: '/api/cards/',
    data: { card }
  });
};

export const updateCard = card => {
  return $.ajax({
    method: "PATCH",
    url: `/api/cards/${card.id}`,
    data: { card }
  });
};

export const deleteCard = cardId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/cards/${cardId}`,
  });
};
