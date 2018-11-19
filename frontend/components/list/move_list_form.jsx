import React from 'react';
import { connect } from 'react-redux';
import { fetchLists, updateList } from '../../actions/list_actions';
import { fetchBoards } from '../../actions/board_actions';
import { selectBoards, selectLists } from '../../reducers/selectors';


class MoveListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.list.position,
      boardId: this.props.list.board_id
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    this.props.fetchBoards(this.props.currentUserId);
    this.props.fetchLists(this.props.boardId);
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
    this.props.toggleMoveListForm();
    this.props.toggleListActions();
  }

  handleSubmit(e) {
    e.preventDefault();
    const updatedList = {
      id: this.props.list.id,
      position: this.state.position,
      board_id: this.state.boardId,
    };
    this.props.updateList(updatedList);
    this.props.toggleMoveListForm();
    this.props.fetchLists(this.props.boardId);
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
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
        id="select-board-dropdown" >
        <option key={0} disabled>Board</option>
        {boardOptions}
      </select>
    );
  }


  renderPositionOptions() {
    if (this.state.boardId !== this.props.boardId)
      this.props.fetchLists(this.state.boardId);
    debugger
    const positionOptions = this.props.lists.filter(list => {
      if (list.board_id !== this.state.boardId)
        return false;
      return true;
    }).map(list => {
      const current = (list.id === this.props.list.id) ? "(current)" : "";
      return (
          <option key={list.id}
          value={list.position}>
          {list.position + current}
          </option>
      );
    });
    return (
      <select value={this.state.position}
        onChange={this.update('position')}
        id="select-position-dropdown">
        <option key={0} disabled>Positions</option>
        {positionOptions}
      </select>
    );
  }

  render() {
    return(
      <div className="move-list-container">

        <div className="move-list-title">
          <img className="return-list-actions"
          onClick={this.toggleShow}
          src={window.backArrowIcon} />
          <span>Move List</span>
          <img className="close-move-list"
          onClick={this.props.toggleMoveListForm}
          src={window.closeIcon} />
        </div>

        <form className="move-list-form" onSubmit={this.handleSubmit}>

          <div className="select-board">
            <label htmlFor="select-board-dropdown">Board</label>
            {this.renderBoardOptions()}
          </div>

          <div className="select-position">
            <label htmlFor="select-position-dropdown">Position</label>
            {this.renderPositionOptions()}
          </div>

          <button className="move-list-button">Move</button>

        </form>

      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    boards: selectBoards(state),
    lists: selectLists(state, ownProps.boardId),
    currentUserId: state.session.currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateList: list => dispatch(updateList(list)),
    fetchBoards: userId => dispatch(fetchBoards(userId)),
    fetchLists: boardId => dispatch(fetchLists(boardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveListForm);
