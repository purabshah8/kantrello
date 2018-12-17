import React from 'react';
import { connect } from 'react-redux';
import { updateCard } from '../../actions/card_actions';

class EditCardDescriptionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: this.props.card.description };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.escFunction = this.escFunction.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.inputRef = React.createRef();
  }

  setRef(node) {
    this.containerRef = node;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction);
    document.addEventListener('mousedown', this.handleClickOutside);
    this.inputRef.current.focus();
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  escFunction(e) {
    if(e.keyCode === 27) {
      this.props.toggleModal('EditCardDescription');
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal('EditCardDescription');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const updatedCard = {
      id: this.props.card.id,
      description: this.state.description,
    };
    this.props.updateCard(updatedCard);
    this.props.toggleModal('EditCardDescription');
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return (
      <div ref={this.setRef}
      className="edit-description-form-container">
        <form onSubmit={this.handleSubmit}
          className="edit-description-form">
          <textarea ref={this.inputRef}
            placeholder="Add a more detailed description..."
            onChange={this.update('description')}
            value={this.state.description} />
          <div className="edit-description-options">
            <button type="submit" className="green-submit-button">Save</button>
            <img onClick={() => this.props.toggleModal('EditCardDescription')}
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
