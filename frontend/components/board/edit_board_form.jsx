import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../../actions/board_actions';
import merge from 'lodash/merge';

class EditBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.board.title };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const editedBoard = {
      id: this.props.board.id,
      title: this.state.title,
    };
    this.props.updateBoard(editedBoard);
    this.props.toggleEditBoard();
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    if (!this.props.showEditBoard) return null;
    return (
      <div className="edit-board-container">
        <div className="edit-board-content-container">
          <div className="edit-board-title">
            <span>Rename Board</span>
            <img onClick={this.props.toggleEditBoard}
              src={window.closeIcon} />
          </div>
          <form className="edit-board-form"
            onSubmit={this.handleSubmit}>
            <label htmlFor="edit-board-name">Name</label>
            <input id="edit-board-name"
              onChange={this.update('title')}
              value={this.state.title}/>
            <button className="submit-edit-board">Rename</button>
          </form>
        </div>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    updateBoard: (board) => dispatch(updateBoard(board)),
  };
};

export default connect(null, mapDispatchToProps)(EditBoardForm);
