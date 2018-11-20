import React from 'react';
import { connect } from 'react-redux';
import { createList, updateList, deleteList } from '../../actions/list_actions';

class ListActions extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteList(this.props.list.id);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleListActions();
    }
  }

  render() {
    return(
      <div className="list-actions-container">
        <div className="list-actions-title">
          <span>List Actions</span>
          <img src={window.closeIcon}
            onClick={this.props.toggleListActions} />
        </div>
        <ul className="list-actions-list">
          <li>Add Card...</li>
          <li onClick={this.props.toggleCopyListForm}>
            Copy List...
          </li>
          <li onClick={this.props.toggleMoveListForm}>
            Move List...
          </li>
        </ul>
        <ul className="list-actions-list">
          <li>Move All Cards in this List...</li>
          <li>Delete All Cards in this List...</li>
        </ul>
        <div onClick={this.handleDelete}
          className="delete-list">
          <span>Delete This List</span>
        </div>
      </div>
    );
  }

}

// const mapStateToProps = state => {
//   return {
//
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    createList: list => dispatch(createList(list)),
    updateList: list => dispatch(updateList(list)),
    deleteList: listId => dispatch(deleteList(listId)),
  };
};

export default connect(null, mapDispatchToProps)(ListActions);
