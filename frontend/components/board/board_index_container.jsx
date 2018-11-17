import React from 'react';
import { connect } from 'react-redux';
import BoardIndex from './board_index';
import { fetchBoards, createBoard, updateBoard } from '../../actions/board_actions';
import { selectBoards } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    boards: selectBoards(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const userId = ownProps.match.params.userId;
  return {
    fetchBoards: () => dispatch(fetchBoards(userId)),
    createBoard: board => dispatch(createBoard(board)),
    updateBoard: board => dispatch(updateBoard(board)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardIndex);
