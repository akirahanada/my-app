import React, { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { timesReducer, initializeTimes, UPDATE_TIMES, getAvailableTimes } from '../utils/bookingUtils';
import { submitAPI } from '../utils/api';

function BookingPage() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(timesReducer, [], initializeTimes);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState('Birthday');

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    const times = getAvailableTimes(newDate);
    dispatch({ type: UPDATE_TIMES, payload: times });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { date, time, guests, occasion };
    const success = submitAPI(formData);
    
    if (success) {
      // Format confirmation message
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      };

      const confirmationMessage = 
        `Reservation Confirmed!\n\n` +
        `Date: ${formatDate(date)}\n` +
        `Time: ${time}\n` +
        `Number of Guests: ${guests}\n` +
        `Occasion: ${occasion}`;

      alert(confirmationMessage);
      
      // Navigate to confirmation page with reservation details
      navigate('/confirmation', { 
        state: { 
          reservation: formData 
        }
      });
    } else {
      alert('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <section className="booking-section" aria-label="Reservation Form">
      <h1>Reserve a Table</h1>
      <form 
        onSubmit={handleSubmit} 
        className="booking-form"
        aria-labelledby="booking-header"
      >
        <fieldset>
          <legend id="booking-header">Reservation Details</legend>
          
          <div className="form-group">
            <label htmlFor="res-date">Choose date</label>
            <input 
              type="date" 
              id="res-date" 
              value={date} 
              onChange={handleDateChange}
              required 
              aria-required="true"
              min={new Date().toISOString().split('T')[0]}
              aria-label="Reservation date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="res-time">Choose time</label>
            <select 
              id="res-time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              required
              aria-required="true"
              aria-label="Reservation time"
            >
              <option value="">Select a time</option>
              {availableTimes.map((timeOption) => (
                <option key={timeOption} value={timeOption}>{timeOption}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="res-guests">Number of guests</label>
            <input 
              type="number" 
              id="res-guests" 
              min="1" 
              max="10" 
              value={guests} 
              onChange={(e) => setGuests(parseInt(e.target.value))} 
              required
              aria-required="true"
              aria-label="Number of guests"
            />
          </div>

          <div className="form-group">
            <label htmlFor="res-occasion">Occasion</label>
            <select 
              id="res-occasion" 
              value={occasion} 
              onChange={(e) => setOccasion(e.target.value)}
              aria-label="Occasion"
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
            </select>
          </div>
        </fieldset>

        <button 
          type="submit" 
          className="button-primary"
          aria-label="Submit reservation request"
        >
          Submit Reservation
        </button>
      </form>
    </section>
  );
}

export default BookingPage;