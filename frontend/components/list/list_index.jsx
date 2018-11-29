import React from 'react';
// import { Draggable } from 'react-beautiful-dnd';
import ListIndexItem from './list_index_item';
import NewListForm from './new_list_form';

export default class ListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchLists();
  }

  toggleModal(modal) {
    if (!this.props.modals) return;
    if (this.props.modals.includes(modal)) {
      this.props.closeModal(modal);
    } else
    this.props.openModal(modal);
  }

  renderLists() {
    if (!this.props.lists) return null;
    const listIndexItems = this.props.lists.map(list => {
      return (
        <ListIndexItem key={list.id}
        list={list}
        boardId={this.props.boardId}
        modals={this.props.modals}
        openModal={this.props.openModal}
        closeModal={this.props.closeModal}
        closeAllModals={this.props.closeAllModals}
        history={this.props.history}/>
      );
    });
    return listIndexItems;
  }

  // draggable for renderLists
  // <Draggable key={list.id} draggableId={"list-"+list.id} index={list.position-1}>
  //         {
  //           (provided) => (
  //             <ListIndexItem key={list.id}
  //             provided={provided}
  //             innerRef={provided.innerRef}
  //             list={list}
  //             boardId={this.props.boardId}
  //             history={this.props.history}/>
  //           )
  //         }
  //       </Draggable>

  renderNewListForm(addListText) {
    if (!this.props.modals || !this.props.modals.includes("NewList")) {
      return (
        <div className="add-new-list-overlay">
        <li onClick={() => this.toggleModal("NewList")}
          className="new-list">
          <img src={window.plusWhiteIcon} />
          <span>{addListText}</span>
        </li>
      </div>
      );
    }
    return <NewListForm
      createList={this.props.createList}
      toggleModal={this.toggleModal}
      boardId={this.props.boardId}/>;
  }

  render() {
    const lists = this.renderLists();
    const addListText = (lists.length !== 0) ? "Add another list":"Add a list";
    // const { provided, innerRef } = this.props;
    return(
      <div className="lists-container">
        <ul className="lists">
          {lists}
          <div className="list-item-container">
            {this.renderNewListForm(addListText)}
          </div>
        </ul>
      </div>
    );
  }
}

// <div ref={innerRef}
//       {...provided.droppableProps}
//       className="lists-container">
//         <ul className="lists">
//           {lists}
//           {provided.placeholder}
//           <div className="list-item-container">
//             {this.renderNewListForm(addListText)}
//           </div>
//         </ul>
//       </div>