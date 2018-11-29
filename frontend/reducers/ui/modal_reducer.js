import { OPEN_MODAL, CLOSE_MODAL, CLOSE_ALL_MODALS } from '../../actions/modal_actions';

export default function modalReducer(state = [], action) {
  Object.freeze(state);
  const newState = state.slice();
  switch (action.type) {
    case OPEN_MODAL:
      debugger
      newState.push(action.modal);
      return newState;
    case CLOSE_MODAL:
      debugger
      const modalIndex = newState.indexOf(action.modal);
      if (modalIndex > -1)
        newState.splice(modalIndex, 1);
      return newState;
    case CLOSE_ALL_MODALS:
      return [];
    default:
      return state;
  }
}
