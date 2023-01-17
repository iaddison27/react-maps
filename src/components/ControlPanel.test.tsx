import { TargetElement } from '@testing-library/user-event';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ControlPanel from './ControlPanel';


describe('ControlPanel tests', () => {
    test('should disable "Clear Last Point" button when no route is present', () => {
        const state = {
            distance: 0,
            route: []
        };
        render(<ControlPanel state={state} setState={() =>{}} />);

        const clearLastBtn = screen.getByTestId('clear-last-btn');
        expect(clearLastBtn).toBeDisabled();
    });

    test('should enable "Clear Last Point" button when route is present', () => {
        const route: [number, number][] = [[55, 1.5], [55, 1.6]];
        const state = {
            distance: 0,
            route: route
        };
        render(<ControlPanel state={state} setState={() =>{}} />);

        const clearLastBtn = screen.getByTestId('clear-last-btn');
        expect(clearLastBtn).toBeEnabled();
    });

    test('should disable "Clear Route" button when no route is present', () => {
        const state = {
            distance: 0,
            route: []
        }
        render(<ControlPanel state={state} setState={() =>{}} />);

        const clearRouteBtn = screen.getByTestId('clear-route-btn');
        expect(clearRouteBtn).toBeDisabled();
    });

    test('should enable "Clear Route" button when route is present', () => {
        const route: [number, number][] = [[55, 1.5], [55, 1.6]];
        const state = {
            distance: 0,
            route: route
        }
        render(<ControlPanel state={state} setState={() =>{}} />);

        const clearRouteBtn = screen.getByTestId('clear-route-btn');
        expect(clearRouteBtn).toBeEnabled();
    });

    test('should display distance in KM initially', () => {
        const state = {
            distance: 0,
            route: []
        }
        render(<ControlPanel state={state} setState={() =>{}} />);

        const titleElement = screen.getByText('KM');
        expect(titleElement).toBeInTheDocument();
    });

    test('should update distance from KM to Miles', () => {
        const state = {
            distance: 8,
            route: []
        }
        render(<ControlPanel state={state} setState={() =>{}} />);

        let distanceDisplay = screen.getByText('Distance: 8.00');
        expect(distanceDisplay).toBeInTheDocument();

        const distanceUnitsSelect = screen.queryByTestId('distance-units-select') as TargetElement;
        fireEvent.change(distanceUnitsSelect, { target: { value: 'miles' } });

        distanceDisplay = screen.getByText('Distance: 4.97');
        expect(distanceDisplay).toBeInTheDocument();
    });
});
