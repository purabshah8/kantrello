import React from 'react';
import EditUserForm from './edit_user_form';

export default class UserShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showEditUser: false };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ showEditUser: !this.state.showEditUser });
  }

  userProfileDetails() {
    return(
      <div className="profile-details">
        <div className="profile-basics">
          <h1 className="profile-name">{this.props.user.name}</h1>
          <p className="profile-username">@{this.props.user.username}</p>
        </div>
        <button className="edit-profile-button"
          onClick={this.toggleEdit}>
          <img src={window.editIcon} />Edit Profile
        </button>
      </div>
    );
  }


  render() {
    const { initials, avatar_url } = this.props.user;
    const avatar = avatar_url ? <img className="user-avatar" src={avatar_url} /> : <p className="user-avatar">{initials}</p>;
    return(
      <div className="user-profile-container">
        <div className="user-profile">
          <div className="avatar-container avatar-large-container">
            <div className="user-avatar avatar-large">
              {avatar}
            </div>
          </div>
          {
            this.state.showEditUser ? (
              <EditUserForm
                toggleEdit={this.toggleEdit} />
            ) : this.userProfileDetails()
          }
        </div>
      </div>
    );
  }
}
