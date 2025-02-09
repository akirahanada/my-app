// src/components/Main.js
import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import MenuPage from './MenuPage';
import BookingPage from './BookingPage';
import ConfirmedBooking from './ConfirmedBooking';
import OrderOnlinePage from './OrderOnlinePage';
import ContactPage from './ContactPage';
import { timesReducer, initializeTimes, UPDATE_TIMES } from '../utils/bookingUtils';
import { submitAPI } from '../utils/api';

function Main() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(timesReducer, [], initializeTimes);

  const updateTimes = (date) => {
    dispatch({ type: UPDATE_TIMES, payload: date });
  };

  const submitForm = (formData) => {
    const success = submitAPI(formData);
    if (success) {
      // Show immediate confirmation with details
      const message = `Reservation Confirmed!\n\n` +
        `Date: ${new Date(formData.date).toLocaleDateString()}\n` +
        `Time: ${formData.time}\n` +
        `Number of Guests: ${formData.guests}\n` +
        `Occasion: ${formData.occasion}`;
      
      alert(message);
      
      // Navigate to confirmation page with details
      navigate('/confirmed-booking', { state: { reservation: formData } });
    }
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
              availableTimes={availableTimes || []} 
              updateTimes={updateTimes}
              submitForm={submitForm}
            />
          } 
        />
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </main>
  );
}

export default Main;