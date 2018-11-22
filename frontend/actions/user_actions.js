import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

export const receiveUsers = users => {
  return {
    type: RECEIVE_USERS,
    users,
  };
};

export const receiveCurrentUser = user => {
  return {
    type: RECEIVE_CURRENT_USER,
    user,
  };
};

export const logoutCurrentUser = id => {
  return {
    type: LOGOUT_CURRENT_USER,
    id,
  };
};

export const receiveUserErrors = errors => {
  return {
    type: RECEIVE_USER_ERRORS,
    errors,
  };
};

export const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

export const searchUsers = searchString => dispatch => {
  return UserApiUtil.searchUsers(searchString).then(
    users => dispatch(receiveUsers(users)),
    errors => dispatch(receiveUserErrors(errors))
  );
};


export const fetchUsers = boardId => dispatch => {
  return UserApiUtil.fetchUsers(boardId).then(
    users => dispatch(receiveUsers(users)),
    errors => dispatch(receiveUserErrors(errors))
  );
};


export const createUser = user => dispatch => {
  return UserApiUtil.createUser(user).then(
    newUser => dispatch(receiveCurrentUser(newUser)),
    errors => dispatch(receiveUserErrors(errors))
  );
};

export const updateUser = user => dispatch => {
  return UserApiUtil.updateUser(user).then(
    updatedUser => dispatch(receiveCurrentUser(updatedUser)),
    errors => dispatch(receiveUserErrors(errors))
  );
};


export const deleteUser = id => dispatch => {
  return UserApiUtil.deleteUser(id).then(
    () => dispatch(logoutCurrentUser(id)),
    errors => dispatch(receiveUserErrors(errors))
  );
};

export const login = user => dispatch => {
  return UserApiUtil.logIn(user).then(
    loggedInUser => dispatch(receiveCurrentUser(loggedInUser)),
    errors => dispatch(receiveSessionErrors(errors))
  );
};

export const logout = id => dispatch => {
  return UserApiUtil.logOut(id).then(
    () => dispatch(logoutCurrentUser(id)),
    errors => dispatch(receiveSessionErrors(errors))
  );
};
