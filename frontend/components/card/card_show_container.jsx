import React from 'react';
import { connect } from 'react-redux';
import CardShow from './card_show';
import { fetchCard, updateCard, deleteCard } from '../../actions/card_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const cardId = ownProps.match.params.id;
  const card =  cardId ? state.entities.cards[cardId] : ownProps.cards;
  return {
    card,
    userId: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const cardId = ownProps.match.params.id;
  return {
    updateCard: card => dispatch(updateCard(card)),
    fetchCard: () => dispatch(fetchCard(cardId)),
    deleteCard: () => dispatch(deleteCard(cardId)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardShow));
