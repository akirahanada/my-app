// src/components/Main.test.js
import { render, screen, cleanup } from "@testing-library/react";
import Main from "./Main";
import { initializeTimes, timesReducer } from '../utils/bookingUtils';

// Mock child components
jest.mock('./HomePage', () => {
  const MockHomePage = () => <div>Little Lemon Homepage</div>;
  return MockHomePage;
});

jest.mock('./BookingPage', () => {
  const MockBookingPage = ({ availableTimes, updateTimes }) => (
    <div>
      <h1>Reserve a Table</h1>
      <select aria-label="Choose time">
        <option value="">Select a time</option>
        {availableTimes.map(time => (
          <option key={time} value={time}>{time}</option>
        ))}
      </select>
    </div>
  );
  return MockBookingPage;
});

// Clean up after each test
afterEach(() => {
  cleanup();
  jest.resetModules();
});

// Clean up after all tests
afterAll(() => {
  jest.clearAllMocks();
});

describe("Main Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test("renders main content", () => {
    render(<Main />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  test('initializeTimes returns correct times', () => {
    const times = initializeTimes();
    expect(times).toEqual([
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00'
    ]);
  });

  test('updateTimes returns the same times when given a date', () => {
    const currentState = initializeTimes();
    const newState = timesReducer(currentState, { type: 'UPDATE_TIMES', payload: '2024-02-09' });
    expect(newState).toEqual(currentState);
  });
});