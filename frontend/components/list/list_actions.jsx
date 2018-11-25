import React from 'react';
import { connect } from 'react-redux';
import { createList, updateList, deleteList } from '../../actions/list_actions';
import { updateCard, deleteCard } from '../../actions/card_actions';
import { selectCards } from '../../reducers/selectors';

class ListActions extends React.Component {
  constructor(props) {
    super(props);
    this.deleteAllCards = this.deleteAllCards.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteList(this.props.list.id);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    this.listActions.focus();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleListActions();
    }
  }

  deleteAllCards() {
    for (let i = 0; i < this.props.cards.length; i++) {
      const cardId = this.props.cards[i].id;
      this.props.deleteCard(cardId);
    }
    this.props.toggleListActions();
  }

  render() {
    return(
      <div ref={(listActions) => {this.listActions = listActions;}}
        onBlur={this.props.toggleListActions}
        tabIndex="0"
        className="list-actions-container">
        <div className="list-actions-title">
          <span>List Actions</span>
          <img src={window.closeIcon}
            onClick={this.props.toggleListActions} />
        </div>
        <ul className="list-actions-list">
          <li onClick={this.props.toggleCopyListForm}>
            Copy List...
          </li>
          <li onClick={this.props.toggleMoveListForm}>
            Move List...
          </li>
        </ul>
        <ul className="list-actions-list">

          <li onClick={this.deleteAllCards}>
            Delete All Cards in this List...</li>
        </ul>
        <div onClick={this.handleDelete}
          className="delete-list">
          <span>Delete This List</span>
        </div>
      </div>
    );
  }

}
// add above Copy list...
// <li onClick={this.openNewCardForm}>Add Card...</li>


// add above delete all cards in list
// <li>Move All Cards in this List...</li>

const mapStateToProps = (state, ownProps) => {
  return {
    cards: selectCards(state, ownProps.list.id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createList: list => dispatch(createList(list)),
    updateList: list => dispatch(updateList(list)),
    deleteList: listId => dispatch(deleteList(listId)),
    deleteCard: cardId => dispatch(deleteCard(cardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListActions);
