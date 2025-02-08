// components/BookingPage.js
import React, { useState } from 'react';

function BookingPage({ availableTimes, updateTimes }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    updateTimes(newDate); // Dispatch action to update available times
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Reservation submitted!\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nOccasion: ${occasion}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', maxWidth: '300px', gap: '20px' }}>
      <label htmlFor="res-date">Choose date</label>
      <input 
        type="date" 
        id="res-date" 
        value={date} 
        onChange={handleDateChange}
        required 
      />

      <label htmlFor="res-time">Choose time</label>
      <select 
        id="res-time" 
        value={time} 
        onChange={(e) => setTime(e.target.value)}
        required
      >
        <option value="">Select a time</option>
        {availableTimes.map((timeOption) => (
          <option key={timeOption} value={timeOption}>{timeOption}</option>
        ))}
      </select>

      <label htmlFor="res-guests">Number of guests</label>
      <input 
        type="number" 
        id="res-guests" 
        min="1" 
        max="10" 
        value={guests} 
        onChange={(e) => setGuests(parseInt(e.target.value))} 
        required
      />

      <label htmlFor="res-occasion">Occasion</label>
      <select 
        id="res-occasion" 
        value={occasion} 
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
      </select>

      <button type="submit" className="button-primary">Submit Reservation</button>
    </form>
  );
}

export default BookingPage;