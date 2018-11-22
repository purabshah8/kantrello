import { RECEIVE_CURRENT_USER, RECEIVE_USERS } from '../../actions/user_actions';
import merge from 'lodash/merge';

const usersReducer = (state ={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const newUser = { [action.user.id]: action.user };
      return merge({}, state, newUser);
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    default:
      return state;
  }
};

export default usersReducer;
