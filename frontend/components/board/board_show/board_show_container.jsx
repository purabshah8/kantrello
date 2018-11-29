import React from 'react';
import { connect } from 'react-redux';
import BoardShow from './board_show';
import { fetchBoard, updateBoard, deleteBoard } from '../../../actions/board_actions';
import { openModal, closeModal } from '../../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  const boardId = ownProps.selectedBoard ? ownProps.selectedBoard.id : ownProps.match.params.id;
  return {
    board: state.entities.boards[boardId],
    userId: state.session.currentUserId,
    modals: state.ui.modals,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const boardId = ownProps.selectedBoard ? ownProps.selectedBoard.id : ownProps.match.params.id;
  return {
    updateBoard: board => dispatch(updateBoard(board)),
    fetchBoard: () => dispatch(fetchBoard(boardId)),
    deleteBoard: () => dispatch(deleteBoard(boardId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShow);
