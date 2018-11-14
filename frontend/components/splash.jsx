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
          <h1>Kantrello lets you work more collaboratively and get more done.</h1>
        </div>
      </div>
      <div className="content-middle"></div>
      </section>
    </>
  );
};

export default Splash;
