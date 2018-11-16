import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class UserDropdown extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(id) {
    return (e) => {
      e.preventDefault();
      this.props.logout(id);
    };
  }

  render() {
    const { id, name, username } = this.props.user;
    return (
      <>
        <ul className="user-dropdown">
          <li className= "dropdown-border">
            <span className="user-dropdown-name">{name} ({username})</span>
            <img
              onFocus={this.props.toggleDropdown}
              tabIndex="0"
              className="user-dropdown-close"
              src={window.closeIcon} />
          </li>
          <li className= "dropdown-border">
            <Link className="profile-link"
              to={`/users/${id}`}>Profile</Link>
          </li>
          <li><span className="logout-link" onClick={this.handleLogout(id)}>Log Out</span>
          </li>

        </ul>
      </>
    );
  }

}

export default withRouter(UserDropdown);
