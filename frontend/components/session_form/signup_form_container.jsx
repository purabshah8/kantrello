import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { createUser } from '../../actions/user_actions';
import { Link } from 'react-router-dom';
import { clearErrors } from '../../actions/error_actions';

const mapStateToProps = state => {
  return {
    errors: state.errors.user,
    formType: 'Sign Up',
    navLink: <Link to="/login">sign in to your account</Link>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(createUser(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
