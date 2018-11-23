import React from 'react';
import Navbar from '../../navbar/navbar_container';
import BoardShow from './board_show_container';
import { DragDropContext } from 'react-beautiful-dnd';

const BoardShowParent = (props) => {
  const onDragEnd = result => {
    
  };

  return(
      <DragDropContext onDragEnd={onDragEnd}>
        <Navbar />
        <BoardShow {...props} />
      </DragDropContext>
  );
};

export default BoardShowParent;
