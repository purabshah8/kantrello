import React from 'react';
import { connect } from 'react-redux';

export default class NewCardForm extends React.Component {
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
      this.props.toggleNewCard();
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
      this.props.toggleNewCard();
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return(
      <li className="new-card-form-item">
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
              onClick={this.props.toggleNewCard} />
          </div>
        </form>
      </li>
    );
  }
}
