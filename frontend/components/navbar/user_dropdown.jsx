import React from 'react';
import { withRouter } from 'react-router-dom';

class UserDropdown extends React.Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.setRef = this.setRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
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
      this.props.toggleModal('UserDropdown');
    }
  }

  handleClickOutside(e) {
    if (this.containerRef && !this.containerRef.contains(e.target)) {
      this.props.toggleModal('UserDropdown');
    }
  }

  handleLogout(id) {
    return (e) => {
      e.preventDefault();
      this.props.toggleModal('UserDropdown');
      this.props.logout(id);
    };
  }

  goToProfile() {
    this.props.toggleModal('UserDropdown');
    this.props.history.push(`/users/${this.props.user.id}`);
  }

  render() {
    const { id, name, username } = this.props.user;
    return (
      <ul ref={this.setRef}
      className="user-dropdown">
        <li className= "dropdown-item">
          <span className="user-dropdown-name">{name} ({username})</span>
          <img onClick={() => this.props.toggleModal('UserDropdown')}
            className="user-dropdown-close"
            src={window.closeIcon} />
        </li>
        <li className= "dropdown-item" onClick={this.goToProfile}>
          <span className="profile-link">
            Profile
          </span>
        </li>
        <li className="dropdown-item">
          <span className="logout-link" onClick={this.handleLogout(id)}>
            Log Out
          </span>
        </li>

      </ul>
    );
  }

}

export default withRouter(UserDropdown);
