import React from 'react';
import { connect } from 'react-redux';
import CardIndex from './card_index';
import { fetchCards, createCard, updateCard, deleteCard } from '../../actions/card_actions';
import { selectCards } from '../../reducers/selectors';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    cards: selectCards(state, ownProps.list.id),
    modals: state.ui.modals,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchCards: () => dispatch(fetchCards(ownProps.list.id)),
    createCard: card => dispatch(createCard(card)),
    updateCard: card => dispatch(updateCard(card)),
    deleteCard: cardId => dispatch(deleteCard(cardId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardIndex);
