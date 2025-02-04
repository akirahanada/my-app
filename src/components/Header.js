// components/Header.js
import React from 'react';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Little Lemon Restaurant Logo" className="logo" />
    </header>
  );
}

export default Header;