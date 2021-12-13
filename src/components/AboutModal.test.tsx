import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutModal from './AboutModal';

test('should display a title of "About"', () => {
    render(<AboutModal show={true} handleClose={() => {}} />);
    const titleElement = screen.getByText(/About/i);
    expect(titleElement).toBeInTheDocument();
});
