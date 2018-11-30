import React from 'react';

export default class NewCardForm extends React.Component {
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
      this.props.toggleModal(`NewCard-${this.props.listId}`);
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal(`NewCard-${this.props.listId}`);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title.length > 0) {
      const newCard = {
        title: this.state.title,
        list_id : this.props.listId,
      };
      this.props.createCard(newCard);
      this.props.toggleModal(`NewCard-${this.props.listId}`);
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
      className="new-card-form-item">
        <form className="new-card-form"
          onSubmit={this.handleSubmit}>
          <div className="new-card-form-input">
            <textarea className="card-item-container"
              placeholder="Enter a title for this card..."
              onChange={this.update('title')}
              value={this.state.title}/>
          </div>
          <div className="new-card-form-options">
            <button className="green-submit-button">Add Card</button>
            <img src={window.closeIcon}
            onClick={() => this.props.toggleModal(`NewCard-${this.props.listId}`)} />
          </div>
        </form>
      </li>
    );
  }
}
