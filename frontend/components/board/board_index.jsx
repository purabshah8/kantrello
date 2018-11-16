import React from 'react';
import { Link } from 'react-router-dom';
import BoardIndexItem from './board_index_item';

export default class BoardIndex extends React.Component {
  constructor(props) {
    super(props);
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
    return [starredBoards, personalBoards];
  }

  render() {
    const [starredBoards, personalBoards] = this.renderAllBoards();
    return(
      <div className="all-boards-container">
        <div className="boards-container">
          <div className="boards-header">
            <img src={window.starIcon} />
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
