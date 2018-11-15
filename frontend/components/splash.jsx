import React from 'react';
import { Link } from 'react-router-dom';

const Splash = () => {
  return(
    <>
      <nav className="splash-nav">
        <Link className="home-button" to="/"><img className="logo"src={window.logo} /><p>Kantrello</p></Link>
        <div className="session-actions">
          <Link className="login-button" to="/login">Log In</Link>
          <Link className="signup-button" to="/signup">Sign Up</Link>
        </div>
      </nav>
      <section className="content">
      <div className="content-top">
        <div className="header-content">
          <h1>Kantrello allows you work collaboratively and accomplish more than you thought was possible.</h1>
          <p className="content-top-text">Use Kantrello's boards to organize your workflow, your personal life, or anything you can think of!</p>
          <Link className="signup-button large-button" to="/signup">Sign Up - It's Free</Link>
        </div>
        <p>Already a user? <Link className="login-link" to="/login">Log In</Link>
        </p>
      </div>
      <div className="content-middle"></div>
      </section>
    </>
  );
};

export default Splash;
