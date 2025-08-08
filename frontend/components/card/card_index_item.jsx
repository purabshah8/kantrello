import React from 'react';
import { openModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

class CardIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.openCardShow = this.openCardShow.bind(this);
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    let dueDateIcon;
    if (card.due_date) {
      const dueDate = new Date(card.due_date);
      let classNames = "badge-container";
      let imgIcon = window.dueDateIcon;
      const now = new Date();
      const diff = dueDate - now;
      if (diff < 0 && diff >= -86400000) {
        classNames += " recently-past-due";
        imgIcon = window.dueDateWhiteIcon;
      }
      else if (diff < -86400000) {
        classNames += " past-due";
        imgIcon = window.dueDateWhiteIcon;
      } else if (diff >= 0 && diff < 86400000) {
        classNames += " due-soon";
        imgIcon = window.dueDateWhiteIcon;
      }
      dueDateIcon = <div className={classNames}>
        <img src={imgIcon} />
        <span>{`${this.months[dueDate.getMonth()]} ${dueDate.getDate()}`}</span>
      </div>;
    }
    console.log(card.due_date);
    return (
      <>
        {descriptionIcon}
        {commentsIcon}
        {dueDateIcon}
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
