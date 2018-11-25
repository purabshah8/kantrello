import React from 'react';
import ListIndexItem from './list_index_item';
import NewListForm from './new_list_form';
// import { Draggable } from 'react-beautiful-dnd';

export default class ListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showNewList: false };
    this.toggleNewList = this.toggleNewList.bind(this);
  }

  componentDidMount() {
    this.props.fetchLists();
  }


  toggleNewList() {
    this.setState({ showNewList: !this.state.showNewList });
  }


  renderLists() {
    if (!this.props.lists) return null;
    const listIndexItems = this.props.lists.map(list => {
      // debugger;
      return (
        <ListIndexItem key={list.id}
          list={list}
          boardId={this.props.boardId}
          history={this.props.history}/>
        );
      }
    );
    return listIndexItems;
  }

  // draggable for renderLists
  // <Draggable draggableId={list.id}
  //         index={list.position-1}>
  //         {
  //           provided => {
  //             return <ListIndexItem key={list.id}
  //               {...provided.draggableProps}
  //               {...provided.dragHandleProps}
  //               innerRef={provided.innerRef}
  //               list={list}
  //               boardId={this.props.boardId}
  //               history={this.props.history}/>;
  //           }
  //         }

  //       </Draggable>

  renderNewListForm(addListText) {
    if (!this.state.showNewList) {
      return (
        <div className="add-new-list-overlay">
        <li onClick={this.toggleNewList}
          className="new-list">
          <img src={window.plusWhiteIcon} />
          <span>{addListText}</span>
        </li>
      </div>
      );
    }
    return <NewListForm
      createList={this.props.createList}
      toggleNewList={this.toggleNewList}
      boardId={this.props.boardId}/>;
  }

  render() {
    const Lists = this.renderLists();
    const addListText = (Lists.length !== 0) ? "Add another list":"Add a list";
    return(
      <div className="lists-container">
        <ul className="lists">
          {Lists}
          <div className="list-item-container">
            {this.renderNewListForm(addListText)}
          </div>
        </ul>
      </div>
    );
  }
}
