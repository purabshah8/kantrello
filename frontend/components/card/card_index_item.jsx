import React from 'react';
import { openModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

class CardIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.openCardShow = this.openCardShow.bind(this);
  }

  openCardShow(e) {
    this.props.openModal('CardShow');
    this.props.history.push(`/cards/${this.props.card.id}`);
  }

  renderBadges() {
    const { card } = this.props;
    const descriptionIcon = (card.description && card.description.length > 0) ?
      <div className="badge-container">
        <img src={window.descriptionIcon} />
      </div> : null;
    const commentsIcon = (card.commentIds.length > 0) ?
    <div className="badge-container">
      <img src={window.commentsIcon} />
      <span>{card.commentIds.length}</span>
     </div> : null;
    return (
      <>
        {descriptionIcon}
        {commentsIcon}
      </>
    );
  }

  render() {
    const { provided, innerRef, card } = this.props;
    return (
      <div ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="card-item-container">
          <li onClick={this.openCardShow}
            className="card-item">
            <span className="card-title">
              {card.title}
            </span>
            <img className="edit-icon"
              onMouseOver={e => (e.currentTarget.src = window.editDarkIcon)}
              onMouseOut={e => (e.currentTarget.src = window.editIcon)}
              src={window.editIcon} />
            <div className="badges">
              {this.renderBadges()}
            </div>
          </li>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    openModal: (modal, options) => dispatch(openModal(modal, options)),
  };
};

export default connect(null, mapDispatchToProps)(CardIndexItem);
