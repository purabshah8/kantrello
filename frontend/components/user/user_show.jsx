import React from 'react';


export default class UserShow extends React.Component {
  render() {
    const { name, username, email, initials, avatar_url, bio } = this.props.user;
    const avatar = avatar_url ? <img className="avatar-image" src={avatar_url} /> : <div className="avatar-initials">{initials}</div>;
    return(
      <div className="user-profile">
        <div className="user-avatar">
          {avatar}
        </div>
        <div className="profile-details">
          <p>{name}</p>
          <p>{username}</p>
        </div>
      </div>
    );
  }
}
