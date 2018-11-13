import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
// import * as UserApiUtil from './util/user_api_util';
import * as UserActions from './actions/user_actions';

document.addEventListener('DOMContentLoaded', () =>{
  const root = document.getElementById('root');
  const store = configureStore();
  ReactDOM.render(<Root store={store}/>, root);

  // Test
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.login = UserActions.login;
  window.logout = UserActions.logout;
  window.createUser = UserActions.createUser;
  window.updateUser = UserActions.updateUser;
  window.deleteUser = UserActions.deleteUser;
});
