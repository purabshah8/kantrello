import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../../navbar/navbar_container';
import BoardShow from './board_show_container';
import { updateCard } from '../../../actions/card_actions';

const BoardShowParent = (props) => {
  const onDragEnd = result => {
    // result is an object with the following relevant properties:
    // source: { droppableId, index }
    // destination: {droppableId, index }
    // draggableId
    const { source, destination, draggableId } = result;
    if (!destination || 
      (destination.droppableId === source.droppableId && destination.index === source.index))
      return;
    const updatedCard = {
      id: draggableId,
      position: destination.index + 1,
      list_id: destination.droppableId,
    };
    props.updateCard(updatedCard);
  };

  return(
      <DragDropContext onDragEnd={onDragEnd}>
        <Navbar />
        <BoardShow {...props} />
      </DragDropContext>
  );
};



const mapDispatchToProps = dispatch => {
  return {
    updateCard: card => dispatch(updateCard(card)),
  };
};

export default connect(null, mapDispatchToProps)(BoardShowParent);