import React from 'react';
import { connect } from 'react-redux';
import BoardIndex from './board_index';
import { fetchBoards, createBoard, updateBoard } from '../../../actions/board_actions';
import { selectBoards } from '../../../reducers/selectors';
import { openModal, closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    boards: selectBoards(state),
    modals: state.ui.modals,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const userId = ownProps.match.params.userId;
  return {
    fetchBoards: () => dispatch(fetchBoards(userId)),
    createBoard: board => dispatch(createBoard(board)),
    updateBoard: board => dispatch(updateBoard(board)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardIndex);
