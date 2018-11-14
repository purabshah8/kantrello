import React from 'react';
import merge from 'lodash/merge';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(merge({}, this.state));
    if (this.props.loggedIn) {
      this.props.history.push(`/users/${this.props.userId}`);
    }
  }

  update(field) {
    return e => {
      this.setState({[field]: e.target.value});
    };
  }

  renderErrors() {
    const errorsList = this.props.errors || [];
    return(
      <ul>
        {errorsList.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  addField() {
    if (this.props.formType === 'Sign Up') {
      return(
        <label>Name
          <input type="text" onChange={this.update('name')} value={this.state.name} />
        </label>
      );
    }
  }

  render() {
    const { formType, navLink } = this.props;
    const submitText = (formType === 'Sign Up') ? "Create New Account" : "Log In";
    const emailText = (formType === 'Sign Up') ? "" : "(or username)";
    const headerText = (formType === 'Sign Up') ? "Create a Kantrello Account" : "Log in to Kantrello";

    return(
      <form onSubmit={this.handleSubmit} >
        <div>{this.renderErrors()}</div>
        <h2>{headerText}</h2>
        <p>or {navLink}</p>
        {this.addField()}
        <label>Email<p>{emailText}</p>
          <input type="text" onChange={this.update('email')} value={this.state.email} default="name@example.com"/>
        </label>

        <label>Password
          <input type="password" onChange={this.update('password')} value={this.state.password} default="defaultpassword"/>
        </label>

        <button>{submitText}</button>
      </form>
    );
  }
}
