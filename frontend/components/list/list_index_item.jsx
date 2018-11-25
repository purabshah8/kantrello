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
    if (!this.state.showRenameListForm) {
      return(
        <div onClick={this.toggleRenameList}
          className="list-title-div">
          <span>
            {this.props.list.title}
          </span>
        </div>
      );
    } else return(
      <RenameListForm
        toggleRenameList={this.toggleRenameList}
        list={this.props.list} />
    );
  }

  renderListActions() {
    if (!this.state.showListActions) {
      return null;
    } else {
      return <ListActions
        list={this.props.list}
        boardId={this.props.boardId}
        toggleCardsDeleted={this.toggleCardsDeleted}
        toggleListActions={this.toggleListActions}
        toggleMoveListForm={this.toggleMoveListForm}
        toggleCopyListForm={this.toggleCopyListForm}/>;
    }
  }

  renderMoveListForm() {
    if (!this.state.showMoveListForm) return null;
    return(
      <MoveListForm
        toggleMoveListForm={this.toggleMoveListForm}
        toggleListActions={this.toggleListActions}
        boardId={this.props.boardId}
        list={this.props.list}/>
    );
  }

  renderCopyListForm() {
    if (!this.state.showCopyListForm) return null;
    return(
      <CopyListForm
        toggleCopyListForm={this.toggleCopyListForm}
        toggleListActions={this.toggleListActions}
        boardId={this.props.boardId}
        list={this.props.list}/>
    );
  }

  render() {
    return (
      <div ref={this.props.innerRef}
        className="list-item-container">
        {this.renderListActions()}
        {this.renderMoveListForm()}
        {this.renderCopyListForm()}
        <li className="list-item">
          <div className="list-title">
            {this.renderRenameListForm()}
            <div
              onClick={this.toggleListActions}
              className="list-actions-overlay">
              <img src={window.moreIcon}/>
            </div>
          </div>
          <Droppable droppableId={this.props.list.id}>
            { (provided,snapshot) => (
              <CardIndex 
              provided={provided}
              innerRef={provided.innerRef}
              snapshot={snapshot.isDraggingOver}
              history={this.props.history} 
              list={this.props.list}>
              </CardIndex>
            )}
          </Droppable>
        </li>

      </div>
    );
  }
}
