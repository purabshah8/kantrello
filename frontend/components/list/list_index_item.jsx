import React from 'react';
import ListActions from './list_actions';
import RenameListForm from './rename_list_form';
import MoveListForm from './move_list_form';

export default class ListIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showListActions: false,
      showRenameListForm: false,
      showMoveListForm: false,
     };
    this.toggleListActions = this.toggleListActions.bind(this);
    this.toggleRenameList = this.toggleRenameList.bind(this);
    this.toggleMoveListForm = this.toggleMoveListForm.bind(this);
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

  toggleRenameList(e) {
    if (e) {
      if (e.target.type !== "text") {
        this.setState({ showRenameListForm: !this.state.showRenameListForm});
      }
    } else {
      this.setState({ showRenameListForm: !this.state.showRenameListForm});
    }
  }

  renderListActions() {
    if (!this.state.showListActions) {
      return null;
    } else {
      return <ListActions
        onBlur={this.toggleListActions}
        list={this.props.list}
        boardId={this.props.boardId}
        toggleListActions={this.toggleListActions}
        toggleMoveListForm={this.toggleMoveListForm} />;
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

  render() {
    return(
      <div className="list-item-container">
        {this.renderListActions()}
        {this.renderMoveListForm()}
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
          <ul className="list-cards">
          </ul>
          <div className="new-card">
            <img src={window.plusIcon} />
            <span>Add another card</span>
          </div>
        </li>

      </div>
    );
  }
}
