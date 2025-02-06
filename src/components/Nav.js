// Nav.js
import React from 'react';

function Nav() {
  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/menu">Menu</a></li>
        <li><a href="/reservations">Reservations</a></li>
        <li><a href="/order-online">Order Online</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
}


export default Nav;