import React, { useMemo, useRef } from 'react';
import { Marker } from 'react-leaflet';
import { LatLng } from 'leaflet';
import { DistanceService } from '../services/DistanceService';
import RouteState from '../models/RouteState';


interface DraggableMarkerProps {
    index: number;
    position: LatLng;
    state: RouteState;
    setState: React.Dispatch<React.SetStateAction<RouteState>>;
}

function DraggableMarker(props: DraggableMarkerProps) {
    const distanceService = useMemo(() =>  new DistanceService(), []);

    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker: any = markerRef.current;
          if (marker != null) {       
            props.setState((prevValue: RouteState) => {
              const newRoute = [...prevValue.route];

              let oldMarker = newRoute[props.index];
              newRoute[props.index] = [marker._latlng.lat, marker._latlng.lng];

              let updatedDistance = prevValue.distance;

              const isFirstPoint = props.index === 0;
              if (!isFirstPoint) {
                  const previousPoint = newRoute[props.index - 1];
                  const distToRemove = distanceService.calculateDistance(new LatLng(previousPoint[0], previousPoint[1]), new LatLng(oldMarker[0], oldMarker[1]));
                  const distToAdd = distanceService.calculateDistance(new LatLng(previousPoint[0], previousPoint[1]), new LatLng(marker._latlng.lat, marker._latlng.lng));
                  updatedDistance = updatedDistance - distToRemove + distToAdd;
              }

              const isLastPoint = props.index + 1 === newRoute.length;
              if (!isLastPoint) {
                  const nextPoint = newRoute[props.index + 1];
                  const distToRemove = distanceService.calculateDistance(new LatLng(nextPoint[0], nextPoint[1]), new LatLng(oldMarker[0], oldMarker[1]));
                  const distToAdd = distanceService.calculateDistance(new LatLng(nextPoint[0], nextPoint[1]), new LatLng(marker._latlng.lat, marker._latlng.lng));
                updatedDistance = updatedDistance - distToRemove + distToAdd; 
              }

              return {
                distance: updatedDistance,
                route: newRoute
              };
             });
          }
        },
      }),
      [distanceService, props]
    );
  
    return (
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={props.position}
        ref={markerRef}
      >

      </Marker>
    );
  }

  export default DraggableMarker;