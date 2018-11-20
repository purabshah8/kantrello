import React from 'react';

export default class CardIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-item-container">
        <li className="card-item">
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
