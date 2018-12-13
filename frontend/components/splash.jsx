import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer.jsx';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transparentSplashNav: true,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      const isTop = (window.scrollY > 300);
      if (!isTop) {
        this.setState({ transparentSplashNav: false });
      }
    });
  }
  render() {
    const splashNavClasses = this.state.transparentSplashNav ? "transparent-nav splash-nav" : "splash-nav";
    return(
      <div className="splash">
        <nav className={splashNavClasses}>
          <Link className="home-button" to="/"><img className="logo"src={window.logo} /><p>Kantrello</p></Link>
          <div className="session-actions">
            <Link className="login-button" to="/login">Log In</Link>
            <Link className="signup-button" to="/signup">Sign Up</Link>
          </div>
        </nav>
        <section className="content">
          <div className="content-top">
            <div className="header-content">
              <h1>Work smarter and unleash your productivity with Kantrello.</h1>
              <p className="content-top-text">Use Kantrello to organize your workflow, your personal life, or anything you can think of!</p>
              <Link className="signup-button large-button"
                to="/signup">
                Sign Up - It's Free!
              </Link>
            </div>
            <div className="splash-pic">
              <img src={window.splashIcon} alt="splash"/>
            </div>
          </div>
          <div className="content-middle">
            <div className="middle-header-content">
              <h1>Manage all your projects</h1>
              <p>Get started using Kantrello's easy to use boards, lists and cards.</p>
              <Link className="signup-button large-button-2"
                to="/signup">
                Start Doing →
              </Link>
            </div>
            <img src={window.sampleBoard} alt="board"/>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Splash;



