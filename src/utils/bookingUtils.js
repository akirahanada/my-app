// src/utils/bookingUtils.js

// src/utils/bookingUtils.js
import { fetchAPI } from './api';

export const UPDATE_TIMES = 'UPDATE_TIMES';

// Helper function to get available times for a date
export const getAvailableTimes = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return fetchAPI(dateObj);
};

export const timesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TIMES:
      return action.payload;
    default:
      return state;
  }
};

export const initializeTimes = () => {
  const today = new Date();
  return getAvailableTimes(today);
};