import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from '../../navbar/navbar_container';
import BoardShow from './board_show_container';
import { updateCard } from '../../../actions/card_actions';
import { updateList } from '../../../actions/list_actions';

const BoardShowParent = (props) => {
  const onDragEnd = result => {
    // result is an object with the following relevant properties:
    // source: { droppableId, index }
    // destination: {droppableId, index }
    // draggableId
    const { source, destination, draggableId, type } = result;
    if (type === "card") {
      console.log(result);
      
      if (!destination || 
        (parseInt(destination.droppableId) === parseInt(source.droppableId) && destination.index === source.index))
        return;
      const updatedCard = {
        id: parseInt(draggableId),
        position: destination.index + 1,
        list_id: destination.droppableId,
      };
      props.updateCard(updatedCard);
    // } else if (type === "list") {
    //   if (!destination || 
    //     destination.index === source.index)
    //     return;
    //   const updatedList = {
    //     id: parseInt(draggableId.slice(5)),
    //     position: destination.index + 1,
    //     board_id: destination.droppableId,
    //   };
    //   props.updateList(updatedList);
    }
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
    updateList: list => dispatch(updateList(list)),
  };
};

export default connect(null, mapDispatchToProps)(BoardShowParent);