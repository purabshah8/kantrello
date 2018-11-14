import React from 'react';
import { Link } from 'react-router-dom';
export default class Navbar extends React.Component {

  render() {
    return(
      <nav className="header-nav">
        <div className="left-nav">
        </div>
        <Link className="home-button-header" to="/"><img className="logo-header"src={window.logo} /><p>Kantrello</p></Link>
        <div className="right-nav">
        </div>
      </nav>
    );
  }
}
