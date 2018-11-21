import React from 'react';
import { connect } from 'react-redux';
import CardShow from './card/card_show_container';

const Modal = (props) => {
  const {modal} = props;
  let component;
  if (!modal) {
    return null;
  } else {
    switch (modal) {
      case 'CardShow':
      component = <CardShow {...props} />;
      break;
    default:
      return null;
    }
  } return (
    <>
      { component }
    </>
  );
};
export default Modal;
