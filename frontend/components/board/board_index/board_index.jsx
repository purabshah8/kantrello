import React from 'react';
import { Link } from 'react-router-dom';
import BoardIndexItem from './board_index_item';
import CreateBoardModal from './create_board_modal';

export default class BoardIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modal: false};
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({ modal: !this.state.modal });
  }

  componentDidMount() {
    this.props.fetchBoards();
  }

  renderAllBoards() {
    const starredBoards = [];
    const personalBoards = [];
    for (var i = 0; i < this.props.boards.length; i++) {
      const board = this.props.boards[i];
      const boardLi = <BoardIndexItem key={board.id} board={board}
        updateBoard={this.props.updateBoard} />;
      if (board.starred) starredBoards.push(boardLi);
      personalBoards.push(boardLi);
    }
    personalBoards.push(
      <li key={-1} className="board-tile"
        onClick={this.toggleModal}>
          <div className="overlay add-board">
            <span className="add-board-text">Create new board...</span>
          </div>
      </li>
    );
    return [starredBoards, personalBoards];
  }

  render() {
    const [starredBoards, personalBoards] = this.renderAllBoards();
    const createBoard = this.state.modal ? <CreateBoardModal
      createBoard={this.props.createBoard}
      modal={this.state.modal}
      toggleModal={this.toggleModal}
      userId={this.props.match.params.userId} /> : null;
    return(

      <div className="all-boards-container">
        {createBoard}
        <div className="boards-container">
          <div className="boards-header">
            <img src={window.starGrayIcon} />
            <h1>Starred Boards</h1>
          </div>
          <ul className="boards">
            {starredBoards}
          </ul>
        </div>

        <div className="boards-container">
          <div className="boards-header">
            <img src={window.personIcon} />
            <h1>Personal Boards</h1>
          </div>
        </div>
        <ul className="boards">
          {personalBoards}
        </ul>
      </div>
    );
  }
}
