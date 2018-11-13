import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { createUser } from '../../actions/user_actions';
import { Link } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    errors: state.errors.users,
    formType: 'Sign Up',
    navLink: <Link to="/login">create an account</Link>
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(createUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
