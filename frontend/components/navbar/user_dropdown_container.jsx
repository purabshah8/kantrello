import React from 'react';
import UserDropdown from './user_dropdown';
import { connect } from 'react-redux';
import { logout } from '../../actions/user_actions';


const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.currentUserId],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: (id) => dispatch(logout(id)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserDropdown);
