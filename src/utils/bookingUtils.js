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
      // Get available times for the selected date
      const selectedDate = new Date(action.payload);
      return fetchAPI(selectedDate);
    default:
      return state;
  }
};

export const initializeTimes = () => {
  // Initialize with today's available times
  const today = new Date();
  return fetchAPI(today);
};