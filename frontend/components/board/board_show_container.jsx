import React from 'react';
import { connect } from 'react-redux';
import BoardShow from './board_show';
import { fetchBoard, updateBoard } from '../../actions/board_actions';
import { selectBoard } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  const boardId = ownProps.match.params.id;
  return {
    board: state.entities.boards[boardId],
    userId: state.session.currentUserId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.id;
  return {
    updateBoard: board => dispatch(updateBoard(board)),
    fetchBoard: () => dispatch(fetchBoard(boardId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShow);
