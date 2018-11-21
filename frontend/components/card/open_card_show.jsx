import React from 'react';
import BoardShow from '../board/board_show/board_show_parent';
import { connect } from 'react-redux';
import Modal from '../modal.jsx';
import { fetchBoard } from '../../actions/board_actions';
import { fetchCard } from '../../actions/card_actions';

class OpenCardShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCard().then(() => this.props.fetchBoard(this.props.card.board_id));
  }

  renderBoardShow() {
    if (!this.props.selectedBoard) return null;
    return <BoardShow selectedBoard={this.props.selectedBoard} />
  }

  render() {
    const modal = 'CardShow';
    return (
      <>
        {this.renderBoardShow()}
        <Modal modal={modal} card={this.props.card} />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const card = state.entities.cards[ownProps.match.params.id];
  const selectedBoard = card ? state.entities.boards[card.board_id] : null;
  return {
    card,
    selectedBoard,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchBoard: boardId => dispatch(fetchBoard(boardId)),
    fetchCard: () => dispatch(fetchCard(ownProps.match.params.id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenCardShow);
