import React from 'react';
import { connect } from 'react-redux';
import { updateBoard } from '../../../actions/board_actions';

class EditBoardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: this.props.board.title };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  
  setRef(node) {
    this.containerRef = node;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleModal("EditBoard");
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal("EditBoard");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const editedBoard = {
      id: this.props.board.id,
      title: this.state.title,
    };
    this.props.updateBoard(editedBoard);
    this.props.toggleModal("EditBoard");
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return (
      <div ref={this.setRef}
      className="edit-board-container">
        <div className="edit-board-content-container">
          <div className="edit-board-title">
            <span>Rename Board</span>
            <img onClick={() => this.props.toggleModal("EditBoard")}
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
