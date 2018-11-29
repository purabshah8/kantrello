import React from 'react';
import { connect } from 'react-redux';
import ListIndex from './list_index';
import { fetchLists, createList, updateList, deleteList } from '../../actions/list_actions';
import { selectLists } from '../../reducers/selectors';
import { openModal, closeModal, closeAllModals } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
  return {
    lists: selectLists(state, ownProps.boardId),
    modals: state.ui.modals,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchLists: () => dispatch(fetchLists(ownProps.boardId)),
    createList: list => dispatch(createList(list)),
    updateList: list => dispatch(updateList(list)),
    deleteList: listId => dispatch(deleteList(listId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
    closeAllModals: () => dispatch(closeAllModals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListIndex);
