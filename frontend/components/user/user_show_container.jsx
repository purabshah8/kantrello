import React from 'react';
import { connect } from 'react-redux';
import UserShow from './user_show';
import { deleteUser } from '../../actions/user_actions';
const mapStateToProps = (state) => {
  return {
    user: state.entities.users[state.session.currentUserId],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
