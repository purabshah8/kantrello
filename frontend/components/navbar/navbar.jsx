import React from 'react';
import { Link } from 'react-router-dom';
import UserDropdown from './user_dropdown_container';

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDropdown: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  userIcon() {
    const { initials, avatar_url } = this.props.currentUser;
    if (avatar_url) {
      return <img className="user-avatar" src={avatar_url} />;
    } else {
      return <p className="user-avatar">{initials}</p>;
    }
  }

  toggleDropdown(e) {
    this.setState({ showUserDropdown: !this.state.showUserDropdown });
  }

  render() {
    return(
      <nav className="header-nav">

        <div className="left-nav">
          <Link to="/" className="home-overlay">
            <img className="home-button" src={window.homeIcon} />
          </Link>
        </div>

        <Link className="kantrello-button-header" to="/">
          <img className="logo-header"src={window.logo} />
          <p>Kantrello</p>
        </Link>


        <div className="right-nav">
          <div
            onClick={this.toggleDropdown}
            tabIndex="0"
            className="avatar-container">
            {this.userIcon()}
            {
              this.state.showUserDropdown ? (<UserDropdown toggleDropdown={this.toggleDropdown} />) : (null)
            }
          </div>
        </div>

      </nav>
    );
  }
}
