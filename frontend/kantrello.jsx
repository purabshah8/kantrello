import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
import * as BoardApiUtil from './util/board_api_util';
import * as UserActions from './actions/user_actions';

document.addEventListener('DOMContentLoaded', () =>{
  const root = document.getElementById('root');
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: {[window.currentUser.id] : window.currentUser},
      },
      session: {currentUserId: window.currentUser.id},
    };

  }
  const store = configureStore(preloadedState);
  ReactDOM.render(<Root store={store}/>, root);

  // Test
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.login = UserActions.login;
  window.logout = UserActions.logout;
  window.createUser = UserActions.createUser;
  window.updateUser = UserActions.updateUser;
  window.deleteUser = UserActions.deleteUser;
  window.fetchBoards = BoardApiUtil.fetchBoards;
  window.fetchBoard = BoardApiUtil.fetchBoard;
  window.createBoard = BoardApiUtil.createBoard;
  window.updateBoard = BoardApiUtil.updateBoard;
  window.deleteBoard = BoardApiUtil.deleteBoard;
});
