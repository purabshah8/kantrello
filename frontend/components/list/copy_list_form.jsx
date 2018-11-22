import React from 'react';
import { connect } from 'react-redux';
import { fetchLists, createList } from '../../actions/list_actions';
import { selectBoards, selectLists } from '../../reducers/selectors';

class CopyListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.list.title,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    this.copyListForm.focus();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleCopyListForm();
    }
  }

  toggleShow() {
    this.props.toggleCopyListForm();
    this.props.toggleListActions();
  }

  handleSubmit(e) {
    e.preventDefault();
    const copiedList = {
      board_id: this.props.list.board_id,
      title: this.state.title,
    };
    this.props.createList(copiedList).then(() => this.props.fetchLists(this.props.boardId));
    this.props.toggleCopyListForm();
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return(
      <div ref={(copyListForm) => {this.copyListForm = copyListForm;}}
        onBlur={this.props.toggleCopyListForm}
        tabIndex="0"
        className="copy-list-container">
        <div className="copy-list-title">
          <img className="return-list-actions"
          onClick={this.toggleShow}
          src={window.backArrowIcon} />
          <span>Copy List</span>
          <img className="close-copy-list"
          onClick={this.props.toggleCopyListForm}
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

// const mapStateToProps = (state, ownProps) => {
//   return {
//     boards: selectBoards(state),
//     lists: selectLists(state, ownProps.boardId),
//     currentUserId: state.session.currentUserId,
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    createList: list => {
      return dispatch(createList(list));
    },
    fetchLists: boardId => {
      return dispatch(fetchLists(boardId));
    },
  };
};

export default connect(null, mapDispatchToProps)(CopyListForm);
