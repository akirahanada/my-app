// Header.js
import React from 'react';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="Little Lemon Restaurant Logo" className="logo" />
      </div>
    </header>
  );
}

export default Header;