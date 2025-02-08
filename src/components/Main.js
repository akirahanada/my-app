// src/components/Main.js
import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import MenuPage from './MenuPage';
import BookingPage from './BookingPage';
import OrderOnlinePage from './OrderOnlinePage';
import ContactPage from './ContactPage';
import { timesReducer, initializeTimes, UPDATE_TIMES } from '../utils/bookingUtils';

function Main() {
  const [availableTimes, dispatch] = useReducer(timesReducer, null, initializeTimes);

  const updateTimes = (date) => {
    dispatch({ type: UPDATE_TIMES, payload: date });
  };

  return (
    <main className="main-content" role="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route 
          path="/reservations" 
          element={
            <BookingPage 
              availableTimes={availableTimes} 
              updateTimes={updateTimes}
            />
          } 
        />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
  );
}

export default Main;