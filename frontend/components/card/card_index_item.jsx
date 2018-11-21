import React from 'react';
import { Link } from 'react-router-dom';
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

  render() {
    return (
      <div className="card-item-container">
          <li onClick={this.openCardShow}
            className="card-item">
            <span className="card-title">
              {this.props.card.title}
            </span>
            <img className="edit-icon"
              onMouseOver={e => (e.currentTarget.src = window.editDarkIcon)}
              onMouseOut={e => (e.currentTarget.src = window.editIcon)}
              src={window.editIcon} />
            <div className="badges"></div>
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
