import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';
import Navbar from './navbar';

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],

  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: (id) => logout(id),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
