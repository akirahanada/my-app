import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  const mockSubmitForm = jest.fn();
  const mockAvailableTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];

  beforeEach(() => {
    mockSubmitForm.mockClear();
  });

  test('Prevents form submission with invalid data', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        submitForm={mockSubmitForm} 
      />
    );

    // Try to submit form without filling required fields
    const submitButton = screen.getByRole('button', { name: /submit reservation/i });
    fireEvent.click(submitButton);

    // Check that submitForm was not called
    expect(mockSubmitForm).not.toHaveBeenCalled();

    // Verify error messages are displayed
    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  });
});