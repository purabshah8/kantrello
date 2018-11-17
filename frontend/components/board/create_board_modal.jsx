import React from 'react';
import { merge } from 'lodash/merge';

export default class  CreateBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: ''};
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
      this.props.toggleModal();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const ownerId = parseInt(this.props.userId);
    const newBoard = { owner_id: ownerId, title: this.state.title };
    this.props.createBoard(newBoard);
    this.props.toggleModal();
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    const blankTitle = (this.state.title === '');
    const buttonClass = (blankTitle) ? "disabled-board-button" : "enabled-board-button";
    return (
      <div className="modal-background">
        <form className="create-board-form" onSubmit={this.handleSubmit}>
          <div className="create-board-tile">
            <input className="create-board-title"
              onChange={this.update('title')}
              placeholder="Add board title">
            </input>
            <img onClick={this.props.toggleModal}
              src={window.closeWhiteIcon} />
          </div>
          <button className={buttonClass} disabled={blankTitle} >Create Board</button>
        </form>
      </div>
    );
  }

}
