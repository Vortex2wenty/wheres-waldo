import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Levels
        </Link>
        <Link to="/leaderboards" className="nav-link">
          Leaderboards
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
