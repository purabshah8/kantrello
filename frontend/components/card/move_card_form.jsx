import React from 'react';
import { connect } from 'react-redux';
import { fetchLists, updateList } from '../../actions/list_actions';
import { fetchBoards } from '../../actions/board_actions';
import { fetchCards, updateCard } from '../../actions/card_actions';
import { selectBoards, selectLists, selectCards } from '../../reducers/selectors';


class MoveCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.card.position,
      boardId: this.props.card.board_id,
      listId: this.props.card.list_id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    this.props.fetchBoards(this.props.currentUserId);
    this.props.fetchLists(this.props.card.board_id);
    this.props.fetchCards(this.props.card.list_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.boardId != this.state.boardId) {
      this.props.fetchLists(this.state.boardId)
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }


  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleMoveListForm();
    }
  }

  toggleShow() {
    this.props.toggleMoveCardForm();
  }

  handleSubmit(e) {
    e.preventDefault();
    const updatedCard = {
      id: this.props.card.id,
      position: this.state.position,
      board_id: this.state.boardId,
      list_id: this.state.listId,
    };
    this.props.updateCard(updatedCard).then(() => this.props.fetchCards(this.props.card.list_id));
    this.props.toggleMoveCardForm();
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
        id="select-board-dropdown-card" >
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
        id="select-list-dropdown">
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
      <div className="move-card-container">

        <div className="move-card-title">
          <span>Move Card</span>
          <img className="close-move-card"
          onClick={this.props.toggleMoveCardForm}
          src={window.closeIcon} />
        </div>

        <form className="move-card-form" onSubmit={this.handleSubmit}>

          <div className="select-option">
            <label htmlFor="select-board-dropdown-card">Board</label>
            <span className="select-value">
              {this.props.boards.filter(board => board.id == this.state.boardId)[0].title}
            </span>
            {this.renderBoardOptions()}
          </div>

          <div className="select-options-bottom">
            <div className="select-option-list">
              <label htmlFor="select-list-dropdown">List</label>
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

          <button className="green-submit-button">Move</button>

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
    updateCard: card => dispatch(updateCard(card)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveCardForm);
