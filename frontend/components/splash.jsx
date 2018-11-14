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
      <section>
        // add splash page text, background & images
      </section>
    </>
  );
};

export default Splash;
