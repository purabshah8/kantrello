import React from 'react';

const Footer = () => {
  return(
    <footer>
      <p>Created by Purab Shah</p>
      <div className="footer-links">
        <a href="https://github.com/purabshah8" className="fab fa-github"></a>
        <a href="https://www.linkedin.com/in/purab-shah-987717b5/" className="fab fa-linkedin"></a>
        <a href="https://angel.co/purab-shah-2" className="fab fa-angellist"></a>
        <a href="https://purabshah8.github.io" className="fas fa-user-circle"></a>
        <a id="trello-link" href="https://trello.com/">Trello</a>
      </div>
    </footer>
  );
};

export default Footer;
