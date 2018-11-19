import React from 'react';
import ListActions from './list_actions';
import RenameListForm from './rename_list_form';

export default class ListIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showListActions: false, showRenameListForm: false };
    this.toggleListActions = this.toggleListActions.bind(this);
    this.toggleRenameList = this.toggleRenameList.bind(this);
  }

  toggleListActions() {
    this.setState({ showListActions: !this.state.showListActions});
  }

  toggleRenameList(e) {
    if (e) {
      if (!e.target.src && e.target.type !== "text") {
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
        toggleListActions={this.toggleListActions} />;
    }
  }

  renderRenameListForm() {
    if (!this.state.showRenameListForm) {
      return(
        <span>{this.props.list.title}</span>
      );
    } else return(
      <RenameListForm
        toggleRenameList={this.toggleRenameList}
        list={this.props.list} />
    );
  }

  render() {
    return(
      <div className="list-item-container">
        {this.renderListActions()}
        <li className="list-item">
          <div onClick={this.toggleRenameList}
            className="list-title">
            {this.renderRenameListForm()}
            <div onFocus={this.toggleListActions}
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
