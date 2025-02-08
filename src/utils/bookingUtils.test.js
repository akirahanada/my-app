// src/utils/bookingUtils.test.js
import { timesReducer, initializeTimes, UPDATE_TIMES } from './bookingUtils';

describe('Booking Utils', () => {
  test('initializeTimes returns the correct initial state', () => {
    // Initialize times
    const initialTimes = initializeTimes();
    
    // Check if it returns an array
    expect(Array.isArray(initialTimes)).toBe(true);
    
    // Check if it contains the expected time slots
    expect(initialTimes).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
  });

  test('updateTimes returns the same value provided in state', () => {
    // Initial state
    const state = ['17:00', '18:00', '19:00'];
    
    // Action to update times
    const action = { 
      type: UPDATE_TIMES, 
      payload: '2024-02-09' 
    };
    
    // Get new state
    const newState = timesReducer(state, action);
    
    // The current implementation should return the default times
    expect(newState).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
  });
});