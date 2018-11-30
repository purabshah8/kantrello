import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';
import Navbar from './navbar';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
    modals: state.ui.modals,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: (id) => logout(id),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
