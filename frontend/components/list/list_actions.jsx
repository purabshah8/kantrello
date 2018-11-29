import React from 'react';
import { connect } from 'react-redux';
import { createList, updateList, deleteList } from '../../actions/list_actions';
import { updateCard, deleteCard } from '../../actions/card_actions';
import { selectCards } from '../../reducers/selectors';
import { openModal, closeModal } from '../../actions/modal_actions';

class ListActions extends React.Component {
  constructor(props) {
    super(props);
    this.deleteAllCards = this.deleteAllCards.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  setRef(node) {
    this.containerRef = node;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleModal(`ListActions-${this.props.list.id}`);
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal(`ListActions-${this.props.list.id}`);
    }
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteList(this.props.list.id);
  }

  openModal(modal) {
    debugger
    this.props.closeModal(`ListActions-${this.props.list.id}`);
    debugger
    this.props.openModal(`${modal}-${this.props.list.id}`);
  }

  deleteAllCards() {
    const { cards, toggleModal, list } = this.props;
    for (let i = 0; i < cards.length; i++) {
      const cardId = cards[i].id;
      this.props.deleteCard(cardId);
    }
    toggleModal(`ListActions-${list.id}`);
  }

  render() {
    return(
      <div ref={this.setRef}
        className="list-actions-container">
        <div className="list-actions-title">
          <span>List Actions</span>
          <img src={window.closeIcon}
            onClick={() => this.props.toggleModal(`ListActions-${this.props.list.id}`)} />
        </div>
        <ul className="list-actions-list">
          <li onClick={() => this.openModal("CopyList")}>
            Copy List...
          </li>
          <li onClick={() => this.openModal("MoveList")}>
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
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListActions);
