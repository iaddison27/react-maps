import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Form, FormSelect } from 'react-bootstrap';
import { LatLng } from 'leaflet';
import { DistanceService } from '../services/DistanceService';
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
    route: [number, number][];
    setRoute: any;
    distance: number;
    setDistance: any;
}
function ControlPanel(props: ControlPanelProps) {

    const distanceService = new DistanceService();

    const [distanceUnits, setDistanceUnits] = useState('km');

    const clearRouteHandler = () => {
        props.setRoute([]);
        props.setDistance(0);
        console.log('clear route')
    }

    const clearLastPointHandler = () => {
        props.setDistance((prevValue: number) => {
            const route = props.route;
            if (route.length === 1) {
                return prevValue;
            }
            const pointToRemove = route[route.length - 1];
            const newLastPoint = route[route.length - 2];
            const d = distanceService.calculateDistance(new LatLng(pointToRemove[0], pointToRemove[1]), new LatLng(newLastPoint[0], newLastPoint[1]));
            return prevValue - d;
        });
        props.setRoute((prevValue: [number, number][]) => {
            const copied = [...prevValue];
            copied.pop();
            return copied;
        });
    }

    const changeDistanceUnitsHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const newDistanceUnits = event.target.value;
        setDistanceUnits(newDistanceUnits);
    }

    const distanceDisplayValue = distanceUnits === 'km' ? props.distance : distanceService.convertTo(props.distance, 'miles');

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
                <Button onClick={clearLastPointHandler} disabled={props.route.length === 0} className={styles.gap} data-testid="clear-last-btn">Clear Last Point</Button>
                <Button onClick={clearRouteHandler} disabled={props.route.length === 0} data-testid="clear-route-btn">Clear Route</Button>
            </Form.Group>
        </Col>
    );
}

export default ControlPanel;
