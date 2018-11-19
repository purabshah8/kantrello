import React from 'react';

export default class ListIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="list-item-container">
        <li className="list-item">
          <div className="list-title">
            <span>{this.props.list.title}</span>
            <div className="list-actions-overlay">
              <img src={window.moreIcon}/>
            </div>

          </div>
          <ul className="list-cards">
          </ul>
          <div className="new-card">
            <img src={window.plusIcon} />
            <span>Add another card</span>
          </div>
        </li>

      </div>
    );
  }
}
