// src/components/Main.js
/* global fetchAPI */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import MenuPage from './MenuPage';
import BookingPage from './BookingPage';
import OrderOnlinePage from './OrderOnlinePage';
import ContactPage from './ContactPage';
import ConfirmationPage from './ConfirmationPage';

function Main() {
  return (
    <main className="main-content" role="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservations" element={<BookingPage />} />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </main>
  );
}

export default Main;