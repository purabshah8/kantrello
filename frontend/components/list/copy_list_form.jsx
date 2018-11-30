import React from 'react';
import { connect } from 'react-redux';
import { fetchLists, createList } from '../../actions/list_actions';
import { fetchCards, createCard } from '../../actions/card_actions';
import { selectCards, selectLists } from '../../reducers/selectors';
import { openModal, closeModal, closeAllModals } from '../../actions/modal_actions';
import merge from 'lodash/merge';

class CopyListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.list.title,
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
    this.props.fetchCards(this.props.list.id);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal(`CopyList-${this.props.list.id}`);
    }
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleModal(`CopyList-${this.props.list.id}`);
    }
  }

  createCopiedCards(action) {
    const listId = action.list.id;
    for (var i = 0; i < this.props.cards.length; i++) {
      const card = merge({}, this.props.cards[i]);
      card["list_id"] = listId;
      this.props.createCard(card);
    }
  }

  toggleShow() {
    this.props.closeModal(`CopyList-${this.props.list.id}`);
    this.props.openModal(`ListActions-${this.props.list.id}`);
  }

  handleSubmit(e) {
    e.preventDefault();
    const copiedList = {
      board_id: this.props.list.board_id,
      title: this.state.title,
    };
    this.props.createList(copiedList).then(
      (action) => this.createCopiedCards(action)
    );
    this.props.toggleModal(`CopyList-${this.props.list.id}`);
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return(
      <div ref={this.setRef}
        className="copy-list-container">
        <div className="copy-list-title">
          <img className="return-list-actions"
          onClick={this.toggleShow}
          src={window.backArrowIcon} />
          <span>Copy List</span>
          <img className="close-copy-list"
          onClick={() => this.props.toggleModal(`CopyList-${this.props.list.id}`)}
          src={window.closeIcon} />
        </div>

        <form className="copy-list-form"
          onSubmit={this.handleSubmit}>

          <div className="copy-title">
            <label htmlFor="copy-title-textarea">Name</label>
            <textarea id="copy-title-textarea"
              onChange={this.update('title')}
              value={this.state.title}/>
          </div>

          <button className="green-submit-button">Create List</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    cards: selectCards(state, ownProps.list.id),
    lists: selectLists(state, ownProps.boardId),
    currentUserId: state.session.currentUserId,
    modals: state.ui.modals,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createList: list => dispatch(createList(list)),
    fetchLists: boardId => dispatch(fetchLists(boardId)),
    createCard: card => dispatch(createCard(card)),
    fetchCards: listId => dispatch(fetchCards(listId)),
    openModal: modal => dispatch(openModal(modal)),
    closeModal: modal => dispatch(closeModal(modal)),
    closeAllModals: () => dispatch(closeAllModals()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyListForm);
