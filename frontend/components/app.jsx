import React from 'react';
import { Route, Link } from 'react-router-dom';
import LoginForm from './session_form/login_form_container';
import SignupForm from './session_form/signup_form_container';

const App = () => {
  return(
    <>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/signup" component={SignupForm} />
    </>
  );
};

export default App;
