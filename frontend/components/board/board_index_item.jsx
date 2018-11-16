import React from 'react';
import { Link } from 'react-router-dom';

export default class BoardIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.toggleStar = this.toggleStar.bind(this);
  }

  toggleStar(e) {
    e.preventDefault();
    const { id, starred } = this.props.board;
    this.props.updateBoard({id, starred: !starred });
  }

  render() {
    const { id, starred, title } = this.props.board;

    return (
      <li className={ (starred === true) ? ("board-tile starred") : ("board-tile unstarred")}>
      <Link to={`/boards/${id}`} >
        <div className="overlay">
          <span>{title}</span>
          <img className="star-icon"
            onClick={this.toggleStar}
            src={(starred === true) ? (window.starGoldIcon) : (window.starIcon)} />
        </div>
      </Link>
    </li>
  );
  }
}
