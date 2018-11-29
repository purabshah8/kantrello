import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ListActions from './list_actions';
import RenameListForm from './rename_list_form';
import MoveListForm from './move_list_form';
import CopyListForm from './copy_list_form';
import CardIndex from '../card/card_index_container';

export default class ListIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRenameListForm: false,
      showListActions: false,
      showMoveListForm: false,
      showCopyListForm: false,
     };
    this.toggleRenameList = this.toggleRenameList.bind(this);
    this.toggleListActions = this.toggleListActions.bind(this);
    this.toggleMoveListForm = this.toggleMoveListForm.bind(this);
    this.toggleCopyListForm = this.toggleCopyListForm.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(modal) {
    debugger
    if (!this.props.modals) return;
    if (this.props.modals.includes(modal)) {
      this.props.closeModal(modal);
    } else
    this.props.openModal(modal);
  }

  toggleListActions() {
    this.setState({ showListActions: !this.state.showListActions});
  }

  toggleMoveListForm(e) {
    this.setState({
      showMoveListForm: !this.state.showMoveListForm,
    });
    if (e && e.target.className !== "close-move-list")
    this.toggleListActions();
  }

  toggleCopyListForm() {
    this.setState({
      showCopyListForm: !this.state.showCopyListForm,
    });
  }

  toggleRenameList(e) {
    if (e) {
      if (e.target.type !== "text") {
        this.setState({ showRenameListForm: !this.state.showRenameListForm});
      }
    } else {
      this.setState({ showRenameListForm: !this.state.showRenameListForm});
    }
  }

  renderRenameListForm() {
    const { list, modals } = this.props;
    if (!modals || !modals.includes(`RenameList-${list.id}`)) {
      return(
        <div onClick={() => this.toggleModal(`RenameList-${list.id}`)}
          className="list-title-div">
          <span>
            {list.title}
          </span>
        </div>
      );
    } else return(
      <RenameListForm
        toggleModal={this.toggleModal}
        list={list} />
    );
  }

  renderListActions() {
    const { boardId, list, modals } = this.props;
    if (!modals || !modals.includes(`ListActions-${list.id}`)) {
      return null;
    } else {
      return <ListActions
      list={list}
      boardId={boardId}
      toggleModal={this.toggleModal}
      toggleCardsDeleted={this.toggleCardsDeleted}
      toggleListActions={this.toggleListActions}
      toggleMoveListForm={this.toggleMoveListForm}
      toggleCopyListForm={this.toggleCopyListForm}/>;
    }
  }

  renderMoveListForm() {
    const { boardId, list, modals } = this.props;
    if (!modals || !modals.includes(`MoveList-${list.id}`)) 
     return null;
    return(
      <MoveListForm
        toggleModal={this.toggleModal}
        toggleMoveListForm={this.toggleMoveListForm}
        toggleListActions={this.toggleListActions}
        boardId={boardId}
        list={list}/>
    );
  }

  renderCopyListForm() {
    const { boardId, list, modals } = this.props;
    if (!modals || !modals.includes(`CopyList-${list.id}`))
     return null;
    return(
      <CopyListForm
        toggleCopyListForm={this.toggleCopyListForm}
        toggleListActions={this.toggleListActions}
        boardId={boardId}
        list={list}/>
    );
  }

  render() {
    const { list, history } = this.props;
    return (
      <div className="list-item-container">
        {this.renderListActions()}
        {this.renderMoveListForm()}
        {this.renderCopyListForm()}
        <li className="list-item">
          <div className="list-title">
            {this.renderRenameListForm()}
            <div
              onClick={() => this.toggleModal(`ListActions-${list.id}`)}
              className="list-actions-overlay">
              <img src={window.moreIcon}/>
            </div>
          </div>
          <Droppable droppableId={list.id} type="card">
            { (provided,snapshot) => (
              <CardIndex 
              provided={provided}
              innerRef={provided.innerRef}
              snapshot={snapshot.isDraggingOver}
              history={history} 
              list={list}>
              </CardIndex>
            )}
          </Droppable>
        </li>

      </div>
    );
  }
}

// const { provided, innerRef } = this.props;
//     return (
// <div ref={innerRef}
// {...provided.draggableProps}
// className="list-item-container">
//   {this.renderListActions()}
//   {this.renderMoveListForm()}
//   {this.renderCopyListForm()}
//   <li className="list-item">
//     <div {...provided.dragHandleProps}
//     className="list-title">