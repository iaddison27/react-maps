import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { DistanceService } from '../services/DistanceService';
import ControlPanel from './ControlPanel';
import styles from './LeafletMap.module.css';

interface RouteProps {
    updateDistance: (d: number) => void;
    route: [number, number][];
    setRoute: any;
}

function Route(props: RouteProps) {
    const distanceService = new DistanceService();

    const map = useMapEvents({
        click(e: any) {
            if (props.route.length > 0) {
                const lastPoint = props.route[props.route.length - 1];
                const dist = distanceService.calculateDistance(new LatLng(lastPoint[0], lastPoint[1]), new LatLng(e.latlng.lat, e.latlng.lng));
                props.updateDistance(dist);
            }
            props.setRoute((prevValue: [number, number][]) => [...prevValue, [e.latlng.lat, e.latlng.lng]]);
            map.panTo(e.latlng);
        }
    });

    return (
        <React.Fragment>
            {props.route.map((point, index) => <Marker key={index} position={new LatLng(point[0], point[1])}></Marker>)}
            <Polyline pathOptions={{fillColor: 'blue'}} positions={props.route} />
        </React.Fragment>
    );
}

function LeafletMap() {
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25,41],
        iconAnchor: [12,41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const initialRoute: [number, number][] = [];
    const [route, setRoute] = useState(initialRoute);

    const [distance, setDistance] = useState(0);
    const updateDistance = (d: number) => {
        setDistance((prevValue) => prevValue + d);
    };
    
    return (
        <div className={styles.container}>
            <Container>
            <Row>
                <p>You can use this tool to calculate the distance between a 2 or more points of a route. Draw a route by clicking your starting point and all subsequent points you wish to include in your route.</p>
                <MapContainer center={new LatLng(55,-2)} zoom={11} style={{height: '70vh'}}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Route updateDistance={updateDistance} route={route} setRoute={setRoute} />
                </MapContainer>
                <ControlPanel route={route} setRoute={setRoute} distance={distance} setDistance={setDistance}></ControlPanel>
            </Row>
            </Container>
        </div>
    );
}

export default LeafletMap;
