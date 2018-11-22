import React from 'react';
import { connect } from 'react-redux';
import { selectBoardUsers } from '../../../reducers/selectors';
import { fetchUsers } from '../../../actions/user_actions';
import { createBoardShare, deleteBoardShare } from '../../../actions/board_actions';
import { searchUsers } from '../../../util/user_api_util';

class BoardShareForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSharedUser: null,
      newSharedUserId: null,
      search: '',
      resultDisplayed: false,
    };
    this.renderedSearch = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.deleteBoardShare = this.deleteBoardShare.bind(this);
    this.callSearch = this.callSearch.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    if (this.state.newSharedUser && this.state.newSharedUser !== this.state.search) {
      this.setState({
        newSharedUserId: null,
        newSharedUser: null,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleCopyListForm();
    }
  }

  handleSelect(e) {
    this.setState({
      newSharedUserId: parseInt(e.currentTarget.dataset["userId"]),
      newSharedUser: e.currentTarget.dataset["userName"],
      search: e.currentTarget.dataset["userName"],
      resultDisplayed: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newBoardShare = {
      board_id: this.props.board.id,
      user_id: this.state.newSharedUserId,
    };
    this.props.createBoardShare(newBoardShare).then(() => this.props.fetchUsers());
  }

  deleteBoardShare(e) {
    this.props.deleteBoardShare(parseInt(e.currentTarget.value));
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  renderUsers() {
    const boardShareIds = this.props.board.boardShareIds;
    const boardUsers = this.props.users.map(user => {
      const boardShareId = boardShareIds.find(obj => obj[user.id]);
      return (
        <li key={user.id}>
          <span>{user.name}</span>
          <button value={boardShareId[user.id]}
            onClick={this.deleteBoardShare}>
            <img src={window.trashIcon} />
          </button>
        </li>
      );
    });
    return(
      <ul className="shared-users">
        {boardUsers}
      </ul>
    );
  }



  renderSearch(users) {
    const foundUsers = Object.values(users).map(user => {
      return (
        <li className="user-search-result"
          key={user.id}
          data-user-id={user.id}
          data-user-name={user.name}
          onClick={this.handleSelect}>
          <span>{user.name}</span>
          <span>Username: {user.username}</span>
          <span>Email: {user.email}</span>
        </li>
      );
    });
    this.renderedSearch =
      <div className="found-users-container">
        <ul className="found-users">
          {foundUsers}
        </ul>
      </div>;
    if (!this.state.resultDisplayed) {
      this.setState({ resultDisplayed: true });
    }
  }

  callSearch() {
    if (this.state.search.length < 3 || this.state.newSharedUser === this.state.search)
      this.renderedSearch = null;
    else {
      searchUsers(this.state.search).then(this.renderSearch);
    }
  }

  render() {
    return (
      <div className="board-share-container">
        <div className="board-share-title">
          <span>Share Board</span>
            <img src={window.closeIcon}
              onClick={this.props.toggleBoardShare} />
        </div>
        <div className="shared-users-container">
          <span>Board Members</span>
          {this.renderUsers()}
        </div>
        <form className="search-user-form"
          onSubmit={this.handleSubmit}>
          <label htmlFor="search-user">Share with</label>
          <input id="search-user"
            type="text"
            placeholder="Name, email, or username"
            onChange={this.update('search')}
            value={this.state.search} />
          <button className="green-submit-button">Share</button>
          {this.callSearch()}
          {this.renderedSearch}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: selectBoardUsers(state, ownProps.board.id),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsers: () => dispatch(fetchUsers(ownProps.board.id)),
    searchUsers: searchString => dispatch(searchUsers(searchString)),
    createBoardShare: boardShare => dispatch(createBoardShare(boardShare)),
    deleteBoardShare: boardShareId => dispatch(deleteBoardShare(boardShareId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardShareForm);
