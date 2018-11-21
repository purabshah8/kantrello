import React from 'react';
import { connect } from 'react-redux';
import { updateCard } from '../../actions/card_actions';

class EditCardDescriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: this.props.card.description };
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
      this.props.toggleEditCardDescription();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const updatedCard = {
      id: this.props.card.id,
      description: this.state.description,
    };
    this.props.updateCard(updatedCard);
    this.props.toggleEditCardDescription();
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return (
      <div className="edit-description-form-container">
        <form onSubmit={this.handleSubmit}
          className="edit-description-form">
          <textarea
            onChange={this.update('description')}
            value={this.state.description} />
          <div className="edit-description-options">
            <button type="submit" className="green-submit-button">Save</button>
            <img onClick={this.props.toggleEditCardDescription}
              src={window.closeIcon} />
            <span>This field supports markdown syntax</span>
          </div>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    updateCard: card => dispatch(updateCard(card)),
  };
};

export default connect(null, mapDispatchToProps)(EditCardDescriptionForm);
