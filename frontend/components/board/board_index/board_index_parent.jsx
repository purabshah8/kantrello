import React from 'react';
import Navbar from '../../navbar/navbar_container';
import BoardIndex from './board_index_container';

const BoardIndexParent = (props) => {
  return(
      <>
        <Navbar />
        <BoardIndex {...props} />
      </>
  );
};

export default BoardIndexParent;
