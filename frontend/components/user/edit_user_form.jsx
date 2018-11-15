import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user_actions';
import merge from 'lodash/merge';
import { clearErrors } from '../../actions/error_actions';

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, username, initials, bio } = this.props.user;
    this.state = { id, name, username, initials, bio };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(oldProps) {
    if (this.props.errors !== [] && oldProps.user !==this.props.user) {
      this.setState({ errorsList: [] });
      this.props.toggleEdit();
    }
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser(merge({}, this.state));
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  renderErrors() {
    const errorsList = this.props.errors || [];
    return(
      <ul className="user-edit-errors">
        {errorsList.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { name, username, initials, bio } = this.state;
    return (
      <form className="user-edit-form"
        onSubmit={this.handleSubmit}>
        <div>{this.renderErrors()}</div>
        <label htmlFor="edit-full-name"
        className="user-edit-label">Full Name</label>
        <input id="edit-full-name"
          className="user-edit-input"
          onChange={this.update('name')}
          value={name} />

        <label htmlFor="edit-username"
        className="user-edit-label">Username</label>
        <input id="edit-username"
          className="user-edit-input"
          onChange={this.update('username')}
          value={username} />

        <label htmlFor="edit-initials"
        className="user-edit-label">Initials</label>
        <input id="edit-initials"
          className="user-edit-input"
          onChange={this.update('initials')}
          value={initials} />

        <label htmlFor="edit-bio"
        className="user-edit-label">Bio (optional)</label>
        <textarea id="edit-bio"
          className="user-edit-input user-edit-input-last"
          onChange={this.update('bio')}
          value={bio}
          ></textarea>
        <div className="edit-buttons">
          <button className="submit-update">Save</button>
          <button className="cancel-update"
          onClick={this.props.toggleEdit}>Cancel</button>
        </div>
      </form>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.entities.users[state.session.currentUserId],
    errors: state.errors.user,
  };
};



const mapDispatchToProps = dispatch => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm);
