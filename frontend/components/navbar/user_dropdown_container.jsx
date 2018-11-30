import React from 'react';
import UserDropdown from './user_dropdown';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';
import { openModal, closeModal } from '../../actions/modal_actions';


const mapStateToProps = state => {
  return {
    user: state.entities.users[state.session.currentUserId],
    modals: state.ui.modals,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: (id) => dispatch(logout(id)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
