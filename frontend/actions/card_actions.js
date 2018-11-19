import * as CardApiUtil from '../util/card_api_util';

export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const RECEIVE_CARD = 'RECEIVE_CARD';
export const REMOVE_CARD = 'REMOVE_CARD';
export const RECEIVE_CARD_ERRORS = 'RECEIVE_CARD_ERRORS';

export const receiveCards = cards => {
  return {
    type: RECEIVE_CARDS,
    cards
  };
};

export const receiveCard = card => {
  return {
    type: RECEIVE_CARD,
    card,
  };
};

export const removeCard = id => {
  return {
    type: REMOVE_CARD,
    cardId: id,
  };
};

export const receiveCardErrors = errors => {
  return {
    type: RECEIVE_CARD_ERRORS,
    errors,
  };
};

export const fetchCards = id => dispatch => {
  return CardApiUtil.fetchCards(id).then(
    cards => dispatch(receiveCards(cards)),
    errors => dispatch(receiveCardErrors(errors))
  );
};

// export const fetchCard = id => dispatch => {
//   return CardApiUtil.fetchCard(id).then(
//     card => dispatch(receiveCard(card)),
//     errors => dispatch(receiveCardErrors(errors))
//   );
// };
//
export const createCard =  card => dispatch => {
  return CardApiUtil.createCard(card).then(
    newCard => dispatch(receiveCard(newCard)),
    errors => dispatch(receiveCardErrors(errors))
  );
};

export const updateCard =  card => dispatch => {
  return CardApiUtil.updateCard(card).then(
    updatedCard => dispatch(receiveCard(updatedCard)),
    errors => dispatch(receiveCardErrors(errors))
  );
};

export const deleteCard = id => dispatch => {
  return CardApiUtil.deleteCard(id).then(
    card => dispatch(removeCard(card.id)),
    errors => dispatch(receiveCardErrors(errors))
  );
};
