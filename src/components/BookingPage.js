// components/BookingPage.js
import React, { useState, useEffect } from 'react';

function BookingPage() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');
  const [availableTimes, setAvailableTimes] = useState([
    '17:00', '18:00', '19:00', '20:00', '21:00'
  ]);

  // Update available times when date changes
  useEffect(() => {
    if (date) {
      // This is a simple example - in a real app, you might fetch from an API
      const selectedDate = new Date(date);
      const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
      
      // Different times for weekends vs weekdays
      const times = isWeekend 
        ? ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00']
        : ['17:00', '18:00', '19:00', '20:00', '21:00'];
      
      setAvailableTimes(times);
      
      // Reset time selection when date changes
      setTime('');
    }
  }, [date]);

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
        onChange={(e) => setDate(e.target.value)} 
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
