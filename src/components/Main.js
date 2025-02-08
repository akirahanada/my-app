// components/Main.js
import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import MenuPage from './MenuPage';
import BookingPage from './BookingPage';
import OrderOnlinePage from './OrderOnlinePage';
import ContactPage from './ContactPage';

const UPDATE_TIMES = 'UPDATE_TIMES';

const timesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TIMES:
      return [
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00'
      ];
    default:
      return state;
  }
};

const initializeTimes = () => {
  return [
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];
};

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