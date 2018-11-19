import React from 'react';
import EditBoardForm from './edit_board_form';
import ListIndex from '../../list/list_index_container';

export default class BoardShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditBoard: false,
      showMenu: false,
    };
    this.toggleStar = this.toggleStar.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleEditBoard = this.toggleEditBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
  }

  componentDidMount() {
    this.props.fetchBoard();
  }

  toggleStar(e) {
    e.preventDefault();
    const { id, starred } = this.props.board;
    this.props.updateBoard({id, starred: !starred });
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  toggleEditBoard() {
    this.setState({ showEditBoard: !this.state.showEditBoard });
  }

  deleteBoard() {
    this.props.deleteBoard(this.props.board.id);
    this.props.history.push(`/users/${this.props.userId}/boards`);
  }

  renderMenu() {
    if (!this.state.showMenu) return null;
    return (
      <div className="menu-container">
        <div className="menu-content-container">
          <div className="menu-title">
            <span>Menu</span>
            <img onClick={this.toggleMenu}
              src={window.closeIcon} />
          </div>
          <ul className="menu-top">
            <li className="menu-item" onClick={this.deleteBoard}>
              <img src={window.trashIcon} />
              <span>Delete Board</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  renderEditForm() {
    if (!this.state.showEditBoard) return null;
    return <EditBoardForm toggleEditBoard={this.toggleEditBoard}
      showEditBoard={this.state.showEditBoard}
      board={this.props.board}/>;
  }

  render() {
    const { id, title, starred } = this.props.board || { id: 0, title: '', starred: false};
    const listIndex = (id !== 0) ? <ListIndex boardId={id} /> : null;
    return(
      <div className="board-container">
        {this.renderMenu()}
        {this.renderEditForm()}
        <div className="board-header">
          <div className="board-header-left">
            <div onClick={this.toggleEditBoard}
              className="board-title header-overlay">
              {title}
            </div>
            <div onClick={this.toggleStar}
              className="star header-overlay">
              <img className="header-star-icon"
                src={(starred === true) ? (window.starGoldIcon) : (window.starIcon)} />
            </div>
          </div>

          <div className="board-header-right">
            <div onClick={this.toggleMenu}
              className="show-menu header-overlay">
              <img className="more-icon"
                src={window.moreWhiteIcon}/>
              <span>Show Menu</span>
            </div>
          </div>
        </div>
        {listIndex}
      </div>
    );
  }
}
