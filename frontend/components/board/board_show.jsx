import React from 'react';

export default class BoardShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBoard();
  }

  toggleStar(e) {
    e.preventDefault();
    const { id, starred } = this.props.board;
    this.props.updateBoard({id, starred: !starred });
  }

  render() {
    const { id, title, starred } = this.props.board || { id: 0, title: '', starred: false};
    // debugger
    return(
      <div className="board-container">
        <div className="board-header">
          <div className="overlay">
            {title}
          </div>
          <div className="overlay">
            <img className="star-icon"
              onClick={this.toggleStar}
              src={(starred === true) ? (window.starGoldIcon) : (window.starIcon)} />
          </div>
        </div>
      </div>
    );
  }
}
