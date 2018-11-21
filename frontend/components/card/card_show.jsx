import React from 'react';

export default class CardShow extends React.Component {
  constructor(props) {
    super(props);
    this.closeCardShow = this.closeCardShow.bind(this);
  }

  componentDidMount() {
    this.props.fetchCard();
  }

  closeCardShow(e) {
    this.props.closeModal();
    this.props.history.push(`/boards/${this.props.card.board_id}`);
  }

  render() {
    const fakeCard = { title: null };
    const { title } = this.props.card || fakeCard;
    return(
      <div onClick={this.closeCardShow}
        className="modal-background">
        <div className="card-container"
          onClick={e => e.stopPropagation()}>
          <div>{title}</div>
        </div>
      </div>
    );
  }
}
