// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="Little Lemon Restaurant Logo" className="logo" />
        </Link>
      </div>
    </header>
  );
}

export default Header;