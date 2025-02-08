// src/components/BookingPage.test.js
import { render, screen, cleanup } from "@testing-library/react";
import BookingPage from './BookingPage';

describe('BookingPage Component', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  const mockUpdateTimes = jest.fn();

  // Cleanup after each test
  afterEach(() => {
    cleanup();
    mockUpdateTimes.mockClear();
  });

  test('Renders the BookingPage heading', () => {
    render(<BookingPage availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);
    const headingElement = screen.getByText("Reserve a Table");
    expect(headingElement).toBeInTheDocument();
  });

  test('Renders all form fields', () => {
    render(<BookingPage availableTimes={mockAvailableTimes} updateTimes={mockUpdateTimes} />);
    
    // Check for date input
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    
    // Check for time select
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    
    // Check for guests input
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    
    // Check for occasion select
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /submit reservation/i })).toBeInTheDocument();
  });
});