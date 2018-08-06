import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <nav className="header__nav">
      <a href="#" className="nav__item">Home</a>
      <a href="#" className="nav__item">Stats</a>
      <a href="#" className="nav__item">Play a Game</a>
      {/*<Link to="/" className="nav__item">Home</Link>*/}
      {/*<Link to="/stats" className="nav__item">Stats</Link>*/}
      {/*<Link to="/score" className="nav__item">Submit Score</Link>*/}
    </nav>
  </header>
);

export default Header;