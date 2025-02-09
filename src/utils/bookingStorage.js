// src/utils/bookingStorage.js

export const saveBooking = (bookingData) => {
    try {
      // Get existing bookings from localStorage
      const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
      
      // Add new booking with unique ID
      const newBooking = {
        ...bookingData,
        id: Date.now(), // Simple way to generate unique ID
        createdAt: new Date().toISOString()
      };
      
      // Add to existing bookings
      const updatedBookings = [...existingBookings, newBooking];
      
      // Save back to localStorage
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
      
      return true;
    } catch (error) {
      console.error('Error saving booking:', error);
      return false;
    }
  };
  
  export const getBookings = () => {
    try {
      return JSON.parse(localStorage.getItem('bookings')) || [];
    } catch (error) {
      console.error('Error getting bookings:', error);
      return [];
    }
  };
  
  export const getBookingsByDate = (date) => {
    const bookings = getBookings();
    return bookings.filter(booking => booking.date === date);
  };