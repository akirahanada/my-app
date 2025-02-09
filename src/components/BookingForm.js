// src/components/BookingForm.js
import React, { useState } from 'react';
import { saveBooking, getBookingsByDate } from '../utils/bookingStorage';

const BookingForm = ({ availableTimes, submitForm }) => {
  // Initialize available time slots with all times
  React.useEffect(() => {
    setAvailableTimeSlots(availableTimes);
  }, [availableTimes]);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Birthday'
  });

  const [errors, setErrors] = useState({});
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (formData.guests < 1 || formData.guests > 10) {
      newErrors.guests = 'Number of guests must be between 1 and 10';
    }
    
    if (!formData.occasion) {
      newErrors.occasion = 'Occasion is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Create submission data with proper type conversion
      const submissionData = {
        ...formData,
        guests: parseInt(formData.guests, 10)
      };
      
      // Save to localStorage first
      const saved = saveBooking(submissionData);
      
      if (saved) {
        // If save was successful, call the submitForm prop
        submitForm(submissionData);
        
        // Reset form
        setFormData({
          date: '',
          time: '',
          guests: 1,
          occasion: 'Birthday'
        });
        
        // Clear any existing errors
        setErrors({});
        
        // Optional: Show success message
        alert('Reservation successfully saved!');
      } else {
        // Handle save failure
        setErrors(prev => ({
          ...prev,
          submit: 'Failed to save reservation. Please try again.'
        }));
      }
    }
  };

  const updateAvailableTimes = (selectedDate) => {
    // Get all reservations for the selected date
    const existingBookings = getBookingsByDate(selectedDate) || [];
    
    // Get all reserved times for that date
    const reservedTimes = new Set(existingBookings.map(booking => booking.time));
    
    // Filter out reserved times from available times
    const filteredTimes = availableTimes.filter(time => !reservedTimes.has(time));
    
    setAvailableTimeSlots(filteredTimes);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If date changes, update available times
    if (name === 'date') {
      updateAvailableTimes(value);
      
      // Reset time selection if it was previously set
      setFormData(prev => ({
        ...prev,
        [name]: value,
        time: ''  // Reset time when date changes
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          aria-label="Choose date"
          aria-invalid={!!errors.date}
        />
        {errors.date && <span className="error">{errors.date}</span>}
      </div>

      <div>
        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
          aria-label="Choose time"
          aria-invalid={!!errors.time}
        >
          <option value="">Select a time</option>
          {availableTimeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {errors.time && <span className="error">{errors.time}</span>}
      </div>

      <div>
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          required
          aria-label="Number of guests"
          aria-invalid={!!errors.guests}
        />
        {errors.guests && <span className="error">{errors.guests}</span>}
      </div>

      <div>
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          required
          aria-label="Occasion"
          aria-invalid={!!errors.occasion}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {errors.occasion && <span className="error">{errors.occasion}</span>}
      </div>

      <button 
        type="submit" 
        className="reserve-button"
        aria-label="Submit reservation"
      >
        Make Your Reservation
      </button>
      {errors.submit && <div className="error" role="alert">{errors.submit}</div>}
    </form>
  );
};

export default BookingForm;