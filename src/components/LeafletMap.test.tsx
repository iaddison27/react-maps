import React from 'react';
import { act, render, screen } from '@testing-library/react';
import LeafletMap from './LeafletMap';

describe('LeafletMap tests', () => {
    test('should render no markers initially', () => {
         const { container } = render(<LeafletMap  />);

         const mapMarkers = container.querySelectorAll('img.leaflet-marker-icon');
         expect(mapMarkers.length).toBe(0);
    });

    test('should add a marker when a point is clicked', () => {
        const result = render(<LeafletMap  />);

        act(() => {
            const map: HTMLDivElement = result.container.querySelector('.leaflet-map-pane') as HTMLDivElement;
            map.click();
        });

        const mapMarkers = result.container.querySelectorAll('img.leaflet-marker-icon');
        expect(mapMarkers.length).toBe(1);
    });

    test('should enable the "Clear Route" button when a point is added', () => {
        const result = render(<LeafletMap  />);
        let clearRouteBtn = screen.getByTestId('clear-route-btn');
        expect(clearRouteBtn).toBeDisabled();

        act(() => {
            const map: HTMLDivElement = result.container.querySelector('.leaflet-map-pane') as HTMLDivElement;
            map.click();
        });

        clearRouteBtn = screen.getByTestId('clear-route-btn');
        expect(clearRouteBtn).toBeEnabled();
    });

    test('should enable the "Clear Last Point" button when a point is added', () => {
        const result = render(<LeafletMap  />);
        let clearLastBtn = screen.getByTestId('clear-last-btn');
        expect(clearLastBtn).toBeDisabled();

        act(() => {
            const map: HTMLDivElement = result.container.querySelector('.leaflet-map-pane') as HTMLDivElement;
            map.click();
        });

        clearLastBtn = screen.getByTestId('clear-last-btn');
        expect(clearLastBtn).toBeEnabled();
    });
});
