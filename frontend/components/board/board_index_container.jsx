import React from 'react';
import { connect } from 'react-redux';
import BoardIndex from './board_index';
import { fetchBoards } from '../../actions/board_actions';
import selectBoards from '../../reducers/selectors';

const mapStateToProps = state => {
  return {
    boards: selectBoards(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardIndex);
