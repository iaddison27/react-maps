import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { MapContainer, TileLayer, Polyline, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DraggableMarker from './DraggableMarker';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { DistanceService } from '../services/DistanceService';
import ControlPanel from './ControlPanel';
import styles from './LeafletMap.module.css';
import RouteState from '../models/RouteState';

interface RouteProps {
    state: RouteState;
    setState: React.Dispatch<React.SetStateAction<RouteState>>;
}

function Route(props: RouteProps) {

    const distanceService = new DistanceService();

    const map = useMapEvents({
        click(e: any) {
            props.setState((prevValue: RouteState) => {
                let newDistance = 0;
                if (props.state.route.length > 0) {
                    const lastPoint = props.state.route[props.state.route.length - 1];
                    const dist = distanceService.calculateDistance(new LatLng(lastPoint[0], lastPoint[1]), new LatLng(e.latlng.lat, e.latlng.lng));
                    newDistance = props.state.distance + dist;
                }
                return {
                    distance: newDistance,
                    route:  [...prevValue.route, [e.latlng.lat, e.latlng.lng]]

                }
            });
            map.panTo(e.latlng);
        }
    });


    // TODO: key set so that it changes when the route length changes, otherwise props.route
    // never updates in old markers when new ones are added to the route
    return (
        <React.Fragment>
            {props.state.route.map((point, index) => 
            <DraggableMarker 
                key={index + 'of' + props.state.route.length} 
                index={index} 
                position={new LatLng(point[0], point[1])} 
                state={props.state} 
                setState={props.setState} />
            )}
            <Polyline pathOptions={{fillColor: 'blue'}} positions={props.state.route} />
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
    const [state, setState] = useState({
        distance: 0,
        route: initialRoute
    });
    
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
                    <Route state={state} setState={setState} />
                
                </MapContainer>
                <ControlPanel state={state} setState={setState} />
            </Row>
            </Container>
        </div>
    );
}

export default LeafletMap;
