import React from 'react';

export default class NewListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.toggleModal("NewList");
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal("NewList");
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
      this.props.toggleModal("NewList");
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return(
      <li ref={this.setRef}
      className="new-list-form-item">
        <form className="new-list-form"
          onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter list title..."
            onChange={this.update('title')}
            value={this.state.title}/>
          <div>
            <button className="green-submit-button">Add List</button>
            <img src={window.closeIcon}
              onClick={() => this.props.toggleModal("NewList")} />
          </div>
        </form>
      </li>
    );
  }
}
