import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import LoginForm from './session_form/login_form_container';
import SignupForm from './session_form/signup_form_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from './splash';
import UserParent from './user/user_parent';
import BoardIndexParent from './board/board_index/board_index_parent';
import BoardShowParent from './board/board_show/board_show_parent';

const App = () => {
  const baseRender = () => <h1>Welcome to Kantrello!</h1>;
  return(
    <>
      <Switch>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <ProtectedRoute exact path="/users/:userId/boards" component={BoardIndexParent} />
        <ProtectedRoute exact path="/users/:id" component={UserParent} />
        <ProtectedRoute exact path="/boards/:id" component={BoardShowParent} />
        <AuthRoute exact path="/" component={Splash}  />
      </Switch>
    </>
  );
};

export default App;
