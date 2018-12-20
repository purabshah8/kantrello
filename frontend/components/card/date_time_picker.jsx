import React from 'react';


export default class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    const dueDate = this.props.card.due_date;
    this.state = { dueDate, time: '', date: '' };
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
      this.props.toggleModal("DateTimePicker");
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal("DateTimePicker");
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const updatedCard = {
      id: this.props.card.id,
      due_date: this.state.dueDate,
    };
    this.props.updateCard(updatedCard);
    this.props.toggleModal("DateTimePicker");
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  render() {
    return (
      <div ref={this.setRef}
      className="date-time-container">
        <div className="date-time-title">
          <span>Change Due Date</span>
          <img className="close-date-time"
          onClick={() => this.props.toggleModal("DateTimePicker")}
          src={window.closeIcon} />
        </div>
        <div className="date-time-picker">

        </div>
      </div>
    );
  }
}