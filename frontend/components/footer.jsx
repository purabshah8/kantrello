import React from 'react';

const Footer = () => {
  return(
    <footer>
      <p>Created by Purab Shah</p>
      <div className="footer-links">
        <a href="https://github.com/purabshah8">
          <img src={window.githubIcon} />
        </a>
        <a href="https://trello.com/">Trello</a>
      </div>
    </footer>
  );
};

export default Footer;
