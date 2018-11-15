import React from 'react';
import { connect } from 'react-redux';
import UserShow from './user_show';
import { updateUser, deleteUser } from '../../actions/user_actions';
const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.currentUserId],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
