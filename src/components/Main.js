// components/Main.js
import React from 'react';

function Main() {
  return (
    <main className="main-content">
      <section className="hero">
        <h1>Welcome to Little Lemon</h1>
        <p>Chicago's finest Mediterranean cuisine</p>
      </section>
      
      <section className="reservation">
        <h2>Reserve a Table</h2>
        {/* Reservation form will be added here */}
      </section>
    </main>
  );
}

export default Main;