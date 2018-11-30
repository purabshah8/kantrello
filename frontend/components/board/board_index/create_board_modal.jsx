import React from 'react';

export default class  CreateBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: ''};
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
      this.props.toggleModal('CreateBoard');
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal('CreateBoard');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const ownerId = parseInt(this.props.userId);
    const newBoard = { owner_id: ownerId, title: this.state.title };
    this.props.createBoard(newBoard);
    this.props.toggleModal('CreateBoard');
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    const blankTitle = (this.state.title === '');
    const buttonClass = (blankTitle) ? "disabled-board-button" : "green-submit-button";
    return (
      <div className="modal-background">
        <form ref={this.setRef}
        className="create-board-form" 
        onSubmit={this.handleSubmit}>
          <div className="create-board-tile">
            <input className="create-board-title"
              onChange={this.update('title')}
              placeholder="Add board title">
            </input>
            <img onClick={() => this.props.toggleModal('CreateBoard')}
              src={window.closeWhiteIcon} />
          </div>
          <button className={buttonClass} disabled={blankTitle} >Create Board</button>
        </form>
      </div>
    );
  }

}
