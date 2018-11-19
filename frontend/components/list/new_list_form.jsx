import React from 'react';
import { connect } from 'react-redux';
import merge from 'lodash/merge';

export default class NewListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);

  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
  }


  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleNewList();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title.length > 0) {
      const newList = {
        title: this.state.title,
        board_id : this.props.boardId,
      };
      this.props.createList(newList);
      this.props.toggleNewList();
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return(
      <li className="new-list-form-item">
        <form className="new-list-form"
          onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter list title..."
            onChange={this.update('title')}
            value={this.state.title}/>
          <div>
            <button className="new-list-button">Add List</button>
            <img src={window.closeIcon}
              onClick={this.props.toggleNewList} />
          </div>
        </form>
      </li>
    );
  }
}
