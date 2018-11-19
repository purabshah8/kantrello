import React from 'react';
import Navbar from '../../navbar/navbar_container';
import BoardShow from './board_show_container';

const BoardShowParent = (props) => {
  return(
      <>
        <Navbar />
        <BoardShow {...props} />
      </>
  );
};

export default BoardShowParent;
