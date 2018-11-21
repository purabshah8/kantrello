// import React from 'react';
// import { connect } from 'react-redux';
// import { fetchLists, updateList } from '../../actions/list_actions';
// import { fetchBoards } from '../../actions/board_actions';
// import { selectBoards, selectLists } from '../../reducers/selectors';
//
//
// class MoveCardForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       position: this.props.list.position,
//       boardId: this.props.list.board_id
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.escFunction = this.escFunction.bind(this);
//     this.toggleShow = this.toggleShow.bind(this);
//   }
//
//   componentDidMount() {
//     document.addEventListener('keydown', this.escFunction);
//     this.props.fetchBoards(this.props.currentUserId);
//     this.props.fetchLists(this.props.boardId);
//   }
//
//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.escFunction);
//   }
//
//
//   escFunction(e) {
//     if(e.keyCode === 27) {
//       this.props.toggleMoveListForm();
//     }
//   }
//
//   toggleShow() {
//     this.props.toggleMoveCardForm();
//     this.props.toggleListActions();
//   }
//
//   handleSubmit(e) {
//     e.preventDefault();
//     const updatedList = {
//       id: this.props.list.id,
//       position: this.state.position,
//       board_id: this.state.boardId,
//     };
//     this.props.updateList(updatedList).then(() => this.props.fetchLists(this.props.boardId));
//     this.props.toggleMoveListForm();
//   }
//
//   update(field) {
//     if (field === 'boardId') {
//       return e => {
//         this.setState({[field]: e.target.value}, () => {
//           this.props.fetchLists(this.state.boardId);
//         });
//       };
//     } else {
//       return e => {
//         this.setState({[field]: e.target.value});
//       };
//     }
//   }
//
//   renderBoardOptions() {
//     const boardOptions = this.props.boards.map(board => {
//       const current = (board.id === this.props.boardId) ? "(current)" : "";
//       return (
//           <option key={board.id}
//           value={board.id}>
//           {board.title + current}
//           </option>
//
//       );
//     });
//     return (
//       <select value={this.state.boardId}
//         onChange={this.update('boardId')}
//         id="select-board-dropdown" >
//         <optgroup label="Board">
//           {boardOptions}
//         </optgroup>
//       </select>
//     );
//   }
//
//
//   renderPositionOptions() {
//     let positionOptions = [];
//     if (this.props.boardId == this.state.boardId) {
//       positionOptions = this.props.lists.filter(list => {
//         if (list.board_id != this.state.boardId)
//           return false;
//         return true;
//       }).map(list => {
//         const current = (list.id === this.props.list.id) ? "(current)" : "";
//         return (
//             <option key={list.id}
//             value={list.position}>
//             {list.position + current}
//             </option>
//         );
//       });
//     } else {
//       const selectedBoard = this.props.boards.filter(board => board.id == this.state.boardId);
//       const numLists = selectedBoard[0].listIds.length;
//       for (var i = 1; i <= numLists + 1; i++)
//         positionOptions.push(<option key={i} value={i}>{i}</option>);
//     }
//     return (
//       <select value={this.state.position}
//         onChange={this.update('position')}
//         id="select-position-dropdown">
//         <optgroup label="Position">
//           {positionOptions}
//         </optgroup>
//       </select>
//     );
//   }
//
//   render() {
//     return(
//       <div className="move-list-container">
//
//         <div className="move-list-title">
//           <img className="return-list-actions"
//           onClick={this.toggleShow}
//           src={window.backArrowIcon} />
//           <span>Move List</span>
//           <img className="close-move-list"
//           onClick={this.props.toggleMoveListForm}
//           src={window.closeIcon} />
//         </div>
//
//         <form className="move-list-form" onSubmit={this.handleSubmit}>
//
//           <div className="select-option">
//             <label htmlFor="select-board-dropdown">Board</label>
//             <span className="select-value">
//               {this.props.boards.filter(board => board.id == this.state.boardId)[0].title}
//             </span>
//             {this.renderBoardOptions()}
//           </div>
//
//           <div className="select-option">
//             <label htmlFor="select-position-dropdown">Position</label>
//             <span className="select-value">{this.state.position}</span>
//             {this.renderPositionOptions()}
//           </div>
//
//           <button className="green-submit-button">Move</button>
//
//         </form>
//
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     boards: selectBoards(state),
//     lists: selectLists(state, ownProps.boardId),
//     currentUserId: state.session.currentUserId,
//   };
// };
//
// const mapDispatchToProps = dispatch => {
//   return {
//     updateList: list => {
//       return dispatch(updateList(list));
//     },
//     fetchBoards: userId => dispatch(fetchBoards(userId)),
//     fetchLists: boardId => {
//       return dispatch(fetchLists(boardId));
//     },
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(MoveCardForm);
