import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/user_actions';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    errors: state.errors.session,
    formType: 'Log In',
    navLink: <Link to="/signup">create an account</Link>,
    loggedIn: Boolean(state.session.currentUserId),
    userId: state.session.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
