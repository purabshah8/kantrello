import React from 'react';
// import { Droppable } from 'react-beautiful-dnd';
import EditBoardForm from './edit_board_form';
import BoardShareForm from './board_share_form';
import ListIndex from '../../list/list_index_container';

export default class BoardShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.toggleStar = this.toggleStar.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    if (!this.props.board)
      this.props.fetchBoard();
  }

  toggleStar(e) {
    e.preventDefault();
    const { id, starred } = this.props.board;
    this.props.updateBoard({id, starred: !starred });
  }

  toggleModal(modal) {
    if (!this.props.modals) return;
    if (this.props.modals.includes(modal)) {
      this.props.closeModal(modal);
    } else
    this.props.openModal(modal);
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  deleteBoard() {
    this.props.deleteBoard(this.props.board.id);
    this.props.history.push(`/users/${this.props.userId}/boards`);
  }

  renderBoardShare() {
    if (!this.props.modals || !this.props.modals.includes("BoardShare"))
     return null;
    return(
      <BoardShareForm board={this.props.board}
        toggleModal={this.toggleModal} />
    );
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
              <img src={window.trashDarkIcon} />
              <span>Delete Board</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  renderEditForm() {
    if (!this.props.modals || !this.props.modals.includes("EditBoard")) 
      return null;
    return <EditBoardForm
      toggleModal={this.toggleModal}
      showEditBoard={this.state.showEditBoard}
      board={this.props.board}/>;
  }

  renderListIndex() {
    if(!this.props.board) return null;
    const boardId = this.props.board.id;
    return (
      <ListIndex
      boardId={boardId} 
      history={this.props.history} />
    );
  }

//   <Droppable droppableId={boardId} direction="horizontal" type="list">
//   {
//     (provided, snapshot) => (
//       <ListIndex
//       provided={provided}
//       innerRef={provided.innerRef}
//       snapshot={snapshot.isDraggingOver}
//       boardId={boardId} 
//       history={this.props.history} />
//     )
//   }
// </Droppable>

  render() {
    const { id, title, starred } = this.props.board || { id: 0, title: '', starred: false};
    const sharedUserCount = (this.props.board && this.props.board.userIds.length > 1) ? <p>{this.props.board.userIds.length}</p> : null;
    return(
      <div className="board-container">
        {this.renderMenu()}
        {this.renderEditForm()}
        <div className="board-header">
          <div className="board-header-left">
            <div onClick={() => this.toggleModal("EditBoard")}
              className="board-title header-overlay">
              {title}
            </div>
            <div onClick={this.toggleStar}
              className={(starred === true) ? "starred star header-overlay": "star header-overlay"}>
              <img className="header-star-icon"
                src={(starred === true) ? (window.starGoldIcon) : (window.starIcon)} />
            </div>
            <div onClick={() => this.toggleModal("BoardShare")}
              className="header-overlay board-users">
              {sharedUserCount}
              <img src={window.shareIcon} />
            </div>
            {this.renderBoardShare()}
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
          {this.renderListIndex()}
      </div>
    );
  }
}
