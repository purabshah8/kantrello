import React from 'react';
import { Link, Route } from 'react-router-dom';
import LoginForm from './session_form/login_form_container';
import SignupForm from './session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
const App = () => {
  const baseRender = () => <h1>Welcome to Kantrello!</h1>;
  return(
    <>
      <Route exact path="/" render={baseRender}  />
      <nav className="splash-nav">
        <Link to="/">Kantrello</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />
    </>
  );
};

export default App;
