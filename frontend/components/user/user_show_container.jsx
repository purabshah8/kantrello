import React from 'react';
import { connect } from 'react-redux';
import UserShow from './user_show';
import { updateUser, deleteUser } from '../../actions/user_actions';
const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.currentUserId],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const currentUserId = ownProps.match.params.id;
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    deleteUser: () => dispatch(deleteUser(currentUserId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
