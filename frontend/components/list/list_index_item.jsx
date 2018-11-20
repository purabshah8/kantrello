import React from 'react';
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

  toggleCopyListForm(e) {
    this.setState({
      showCopyListForm: !this.state.showCopyListForm,
    });
    if (e && e.target.className !== "close-copy-list")
    this.toggleListActions();
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
        <span
          onClick={this.toggleRenameList}>
          {this.props.list.title}
        </span>
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
        toggleListActions={this.toggleListActions}
        toggleMoveListForm={this.toggleMoveListForm}
        toggleCopyListForm={this.toggleCopyListForm}
        onBlur={this.toggleListActions}
        tabIndex={0} />;
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
    const addCardText = (this.props.list.cardIds.length !== 0) ? "Add another card":"Add a card";
    return (
      <div className="list-item-container">
        {this.renderListActions()}
        {this.renderMoveListForm()}
        {this.renderCopyListForm()}
        <li className="list-item">
          <div
            className="list-title">
            {this.renderRenameListForm()}
            <div
              onFocus={this.toggleListActions}
              tabIndex="0"
              className="list-actions-overlay">
              <img src={window.moreIcon}/>
            </div>
          </div>
          <CardIndex
            listId={this.props.list.id} />
        </li>

      </div>
    );
  }
}
