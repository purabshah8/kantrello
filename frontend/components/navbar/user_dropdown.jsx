import React from 'react';


export default class UserDropdown extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    // debugger
  }

  handleLogout(id) {
    // debugger
    return (e) => {
      // debugger
      e.preventDefault();
      this.props.logout(id);
    };
  }

  render() {
    const { id, name, username } = this.props.user;
    return (
      <ul className="user-dropdown">
        <li>
          <span>{name} ({username})</span>
          <img className="user-dropdown-close" src={window.closeIcon} />
        </li>
        <li className="logout-link" onClick={this.handleLogout(id)}>Log Out
        </li>
      </ul>
    );
  }

}
