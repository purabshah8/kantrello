export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const CLOSE_ALL_MODALS = 'CLOSE_ALL_MODALS';

export const openModal = modal => {
  debugger
  return {
    type: OPEN_MODAL,
    modal,
  };
};

export const closeModal = modal => {
  debugger
  return {
    type: CLOSE_MODAL,
    modal,
  };
};

export const closeAllModals = () => {
  return {
    type: CLOSE_ALL_MODALS
  };
};
