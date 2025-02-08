// src/utils/bookingUtils.js

export const UPDATE_TIMES = 'UPDATE_TIMES';

export const timesReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_TIMES:
      // For now, return the same available times regardless of date
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

export const initializeTimes = () => {
  return [
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];
};