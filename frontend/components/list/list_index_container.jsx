import React from 'react';
import { connect } from 'react-redux';
import ListIndex from './list_index';
import { fetchLists, createList, updateList, deleteList } from '../../actions/list_actions';
import { selectLists } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    lists: selectLists(state, ownProps.boardId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLists: () => dispatch(fetchLists(ownProps.boardId)),
    createList: list => dispatch(createList(list)),
    updateList: list => dispatch(updateList(list)),
    deleteList: listId => dispatch(deleteList(listId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListIndex);
