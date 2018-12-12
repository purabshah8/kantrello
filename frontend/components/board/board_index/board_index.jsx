import React from 'react';
import BoardIndexItem from './board_index_item';
import CreateBoardModal from './create_board_modal';

export default class BoardIndex extends React.Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(modal) {
    if (!this.props.modals) return;
    if (this.props.modals.includes(modal)) {
      this.props.closeModal(modal);
    } else
    this.props.openModal(modal);
  }

  componentDidMount() {
    this.props.fetchBoards();
  }

  renderCreateBoard() {
    if (!this.props.modals || !this.props.modals.includes('CreateBoard'))
     return null;
    return (
      <CreateBoardModal
      createBoard={this.props.createBoard}
      toggleModal={this.toggleModal}
      userId={this.props.match.params.userId} /> 
    );
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
        onClick={() => this.toggleModal('CreateBoard')}>
          <div className="overlay add-board">
            <span className="add-board-text">Create new board...</span>
          </div>
      </li>
    );
    return [starredBoards, personalBoards];
  }

  render() {
    const [starredBoards, personalBoards] = this.renderAllBoards();
    return(

      <div className="all-boards-container">
        {this.renderCreateBoard()}
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
