import React from 'react';
import merge from 'lodash/merge';
import Footer from '../footer';
export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogIn = this.demoLogIn.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
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
        <>
        <label htmlFor="name-input" className="input-label">Name</label>
        <input id="name-input"
          className="session-form-input"
          type="text"
          onChange={this.update('name')}
          value={this.state.name}
          placeholder="e.g., LeBron James"/>
        </>
      );
    }
  }

  demoLogIn() {
    const that = this;
    this.setState({email:'demo-user', password:'default'}, () => {
      that.props.processForm(merge({}, that.state));
      if (that.props.loggedIn) {
        that.props.history.push(`/users/${that.props.userId}`);
      }
    });
  }

  render() {
    const { formType, navLink, demoLogIn } = this.props;
    const submitText = (formType === 'Sign Up') ? "Create New Account" : "Log In";
    const emailText = (formType === 'Sign Up') ? "" : " (or username)";
    const headerText = (formType === 'Sign Up') ? "Create a Kantrello Account" : "Log in to Kantrello";
    const demoButton = (formType === 'Sign Up') ? "" : <button className="demo-user-button" onClick={this.demoLogIn}>Login as Demo User</button> ;
    return(
      <>
        <form className="session-form" onSubmit={this.handleSubmit} >
          <div>{this.renderErrors()}</div>
          <h2 className="session-form-header">{headerText}</h2>
          <p>or <span>{navLink}</span></p>

          {this.addField()}
          <label htmlFor="email-input" className="input-label">Email<p>{emailText}</p></label>
          <input id="email-input"
            className="session-form-input"
            type="text"
            onChange={this.update('email')}
            value={this.state.email}
            placeholder="e.g., lbj23@uninterrupted.com"/>

          <label htmlFor="password-input" className="input-label">Password</label>
          <input id="password-input"
            className="session-form-input"
            type="password"
            onChange={this.update('password')}
            value={this.state.password}
            placeholder="e.g., StriveForGreatness"/>

          <button className="submit-input">{submitText}</button>
          {demoButton}

        </form>
      </>
    );
  }
}
