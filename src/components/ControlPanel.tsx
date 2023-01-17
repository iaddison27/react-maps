import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Form, FormSelect } from 'react-bootstrap';
import { LatLng } from 'leaflet';
import { DistanceService } from '../services/DistanceService';
import styles from './ControlPanel.module.css';
import RouteState from '../models/RouteState';

interface ControlPanelProps {
    state: RouteState;
    setState: any;//(d: RouteState) => void;
}

function ControlPanel(props: ControlPanelProps) {

    const distanceService = new DistanceService();

    const [distanceUnits, setDistanceUnits] = useState('km');

    const clearRouteHandler = () => {
        props.setState({
            distance: 0,
            route: []
        });
        console.log('clear route')
    }

    const clearLastPointHandler = () => {
        props.setState((prevValue: RouteState) => {
            // Distance
            let newDistance = prevValue.distance;
            const route = prevValue.route;
            if (route.length > 1) {
                const pointToRemove = route[route.length - 1];
                const newLastPoint = route[route.length - 2];
                const d = distanceService.calculateDistance(new LatLng(pointToRemove[0], pointToRemove[1]), new LatLng(newLastPoint[0], newLastPoint[1]));
                newDistance = newDistance - d;
            }

            // Route
            const copiedRoute = [...route];
            copiedRoute.pop();

            return {
                distance: newDistance,
                route: copiedRoute

            }
        });
    }

    const changeDistanceUnitsHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const newDistanceUnits = event.target.value;
        setDistanceUnits(newDistanceUnits);
    }

    const distanceDisplayValue = distanceUnits === 'km' ? props.state.distance : distanceService.convertTo(props.state.distance, 'miles');

    return (
        <Col className="d-flex justify-content-center mt-3">
            <Form.Group className={`${styles.distance} ${styles.gap}`}>
                <h4 className={styles['distance-value']}>Distance: {distanceDisplayValue.toFixed(2)}</h4>
            </Form.Group>
            <Form.Group className={styles.gap}>
                <FormSelect onChange={changeDistanceUnitsHandler} value={distanceUnits} data-testid="distance-units-select">
                    <option value="km">KM</option>
                    <option value="miles">Miles</option>
                </FormSelect>
            </Form.Group>
            <Form.Group>
                <Button onClick={clearLastPointHandler} disabled={props.state.route.length === 0} className={styles.gap} data-testid="clear-last-btn">Clear Last Point</Button>
                <Button onClick={clearRouteHandler} disabled={props.state.route.length === 0} data-testid="clear-route-btn">Clear Route</Button>
            </Form.Group>
        </Col>
    );
}

export default ControlPanel;
