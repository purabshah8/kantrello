import React from 'react';
import { connect } from 'react-redux';
import { fetchLists, updateList } from '../../actions/list_actions';
import { fetchBoards } from '../../actions/board_actions';
import { fetchCards, createCard } from '../../actions/card_actions';
import { selectBoards, selectCards } from '../../reducers/selectors';
import { openModal, closeModal, closeAllModals } from '../../actions/modal_actions';


class CopyCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.card.position,
      boardId: this.props.card.board_id,
      listId: this.props.card.list_id,
      title: this.props.card.title,
      description: this.props.card.description,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  setRef(node) {
    this.containerRef = node;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.fetchBoards(this.props.currentUserId);
    this.props.fetchLists(this.props.card.board_id);
    this.props.fetchCards(this.props.card.list_id);
  }

  componentDidUpdate(_, prevState) {
    if (prevState.boardId != this.state.boardId) {
      this.props.fetchLists(this.state.boardId);
    }
    if (prevState.listId !== this.state.listId) {
      this.setState({position: 1});
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal(`CopyCard-${this.props.card.id}`);
    }
  }


  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleModal(`CopyCard-${this.props.card.id}`);
    }
  }

  toggleShow() {
    this.props.toggleCopyCardForm();
  }

  handleSubmit(e) {
    e.preventDefault();
    const copiedCard = {
      position: this.state.position,
      list_id: this.state.listId,
      title: this.state.title,
      description: this.state.description,
    };
    this.props.createCard(copiedCard).then(() => this.props.fetchCards(this.props.card.list_id));
    this.props.toggleModal(`CopyCard-${this.props.card.id}`);
  }

  update(field) {
    if (field === 'boardId') {
      return e => {
        const newBoard = this.props.boards.filter(board => board.id == e.target.value);
        this.setState({
          [field]: e.target.value,
          listId: newBoard[0].listIds[0],
          position: 1,
        }, () => {
          this.props.fetchLists(this.state.boardId);
        });
      };
    } else if (field === 'listId') {
      return e => {
        this.setState({[field]: e.target.value}, () => {
          this.props.fetchCards(this.state.listId);
        });
      };
    } else {
      return e => {
        this.setState({[field]: e.target.value});
      };
    }
  }

  renderBoardOptions() {
    const boardOptions = this.props.boards.map(board => {
      const current = (board.id === this.props.boardId) ? "(current)" : "";
      return (
        <option key={board.id}
        value={board.id}>
        {board.title + current}
        </option>
      );
    });
    return (
      <select value={this.state.boardId}
        onChange={this.update('boardId')}
        id="select-board-dropdown-copy-card" >
        <optgroup label="Board">
          {boardOptions}
        </optgroup>
      </select>
    );
  }

  renderListOptions() {
    const listOptions = this.props.lists.filter(list => {
      if (list.board_id != this.state.boardId)
        return false;
      return true;
    }).map(list => {
      const current = (list.id === this.props.card.list_id) ? "(current)" : "";
      return (
        <option key={list.id}
        value={list.id}>
        {list.title + current}
        </option>
      );
    });
    return (
      <select value={this.state.listId}
        onChange={this.update('listId')}
        id="select-list-dropdown-copy">
        {listOptions}
      </select>
    );
  }


  renderPositionOptions() {
    let positionOptions = [];
    if (this.props.card.list_id == this.state.listId) {
      positionOptions = this.props.cards.filter(card => {
        if (card.list_id != this.state.listId)
          return false;
        return true;
      }).map(card => {
        const current = (card.id === this.props.card.id) ? "(current)" : "";
        return (
            <option key={card.id}
            value={card.position}>
            {card.position + current}
            </option>
        );
      });
      positionOptions.push(
        <option key={0}
        value={this.props.list.cardIds.length+1}>
        {this.props.list.cardIds.length+1}
        </option>
        );
    } else {
      const selectedList = this.props.lists.filter(list => list.id == this.state.listId);
      const numCards = selectedList.length > 0 ? selectedList[0].cardIds.length : 0;
      for (var i = 1; i <= numCards + 1; i++)
        positionOptions.push(<option key={i} value={i}>{i}</option>);
    }
    return (
      <select value={this.state.position}
        onChange={this.update('position')}
        id="select-position-dropdown-card">
        {positionOptions}
      </select>
    );
  }

  render() {
    const selectedList = this.props.lists.filter(list => list.id == this.state.listId);
    const listText = selectedList.length > 0 ? selectedList[0].title : '';
    return(
      <div ref={this.setRef}
        className="copy-card-container">

        <div className="copy-card-title">
          <span>Copy Card</span>
          <img className="close-copy-card"
          onClick={() => this.props.toggleModal(`CopyCard-${this.props.card.id}`)}
          src={window.closeIcon} />
        </div>

        <form className="copy-card-form" onSubmit={this.handleSubmit}>

          <div className="copy-title">
            <label htmlFor="new-card-title">Title</label>
            <textarea 
              id="new-card-title" 
              value={this.state.title}
              onChange={this.update('title')} />
          </div>

          <div className="select-option">
            <label htmlFor="select-board-dropdown-copy-card">Board</label>
            <span className="select-value">
              {this.props.boards.filter(board => board.id == this.state.boardId)[0].title}
            </span>
            {this.renderBoardOptions()}
          </div>

          <div className="select-options-bottom">
            <div className="select-option-list">
              <label htmlFor="select-list-dropdown-copy">List</label>
              <span className="select-value">
                {listText}
              </span>
              {this.renderListOptions()}
            </div>

            <div className="select-option-position">
              <label htmlFor="select-position-dropdown">Position</label>
              <span className="select-value">{this.state.position}</span>
              {this.renderPositionOptions()}
            </div>
          </div>

          <button className="green-submit-button">Create Card</button>

        </form>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    boards: selectBoards(state),
    lists: Object.values(state.entities.lists),
    cards: selectCards(state, ownProps.card.list_id),
    currentUserId: state.session.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateList: list => dispatch(updateList(list)),
    fetchBoards: userId => dispatch(fetchBoards(userId)),
    fetchLists: boardId => dispatch(fetchLists(boardId)),
    fetchCards: listId => dispatch(fetchCards(listId)),
    createCard: card => dispatch(createCard(card)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
    closeAllModals: () => dispatch(closeAllModals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyCardForm);
