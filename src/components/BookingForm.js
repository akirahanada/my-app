// src/components/BookingForm.js
import React, { useState } from 'react';

function BookingForm({ availableTimes, updateTimes, submitForm }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    occasion: 'Anniversary'
  });

  const [errors, setErrors] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: ''
  });

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!date) {
      return 'Date is required';
    }
    if (selectedDate < today) {
      return 'Date cannot be in the past';
    }
    return '';
  };

  const validateTime = (time) => {
    if (!time) {
      return 'Time is required';
    }
    if (!availableTimes.includes(time)) {
      return 'Please select an available time';
    }
    return '';
  };

  const validateGuests = (guests) => {
    if (!guests) {
      return 'Number of guests is required';
    }
    if (guests < 1) {
      return 'Must have at least 1 guest';
    }
    if (guests > 10) {
      return 'Maximum 10 guests allowed';
    }
    return '';
  };

  const validateOccasion = (occasion) => {
    const validOccasions = ['Birthday', 'Anniversary'];
    if (!occasion) {
      return 'Occasion is required';
    }
    if (!validOccasions.includes(occasion)) {
      return 'Please select a valid occasion';
    }
    return '';
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFormData(prev => ({ ...prev, date: newDate }));
    setErrors(prev => ({ ...prev, date: validateDate(newDate) }));
    updateTimes(newDate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'guests' ? parseInt(value) : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));

    // Validate field based on type
    let error = '';
    switch (name) {
      case 'time':
        error = validateTime(value);
        break;
      case 'guests':
        error = validateGuests(parseInt(value));
        break;
      case 'occasion':
        error = validateOccasion(value);
        break;
      default:
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      date: validateDate(formData.date),
      time: validateTime(formData.time),
      guests: validateGuests(formData.guests),
      occasion: validateOccasion(formData.occasion)
    };
    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitForm({
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        occasion: formData.occasion
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-field">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="date"
          required
          min={new Date().toISOString().split('T')[0]}
          value={formData.date}
          onChange={handleDateChange}
          aria-invalid={errors.date ? "true" : "false"}
          aria-describedby={errors.date ? "date-error" : undefined}
        />
        {errors.date && <span id="date-error" className="error-message">{errors.date}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="time"
          required
          value={formData.time}
          onChange={handleChange}
          aria-invalid={errors.time ? "true" : "false"}
          aria-describedby={errors.time ? "time-error" : undefined}
        >
          <option value="">Select a time</option>
          {availableTimes.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        {errors.time && <span id="time-error" className="error-message">{errors.time}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          required
          value={formData.guests}
          onChange={handleChange}
          aria-invalid={errors.guests ? "true" : "false"}
          aria-describedby={errors.guests ? "guests-error" : undefined}
        />
        {errors.guests && <span id="guests-error" className="error-message">{errors.guests}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          required
          value={formData.occasion}
          onChange={handleChange}
          aria-invalid={errors.occasion ? "true" : "false"}
          aria-describedby={errors.occasion ? "occasion-error" : undefined}
        >
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </select>
        {errors.occasion && <span id="occasion-error" className="error-message">{errors.occasion}</span>}
      </div>

      <button 
        type="submit"
        className="submit-button"
        style={{
          backgroundColor: '#F4CE14',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
        disabled={Object.values(errors).some(error => error !== '')}
      >
        Submit Reservation
      </button>
    </form>
  );
}

export default BookingForm;