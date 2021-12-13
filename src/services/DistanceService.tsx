import { LatLng } from 'leaflet';

export class DistanceService {

    public calculateDistance(point1: LatLng, point2: LatLng): number {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(point2.lat - point1.lat);
        const dLon = this.deg2rad(point2.lng - point1.lng);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(point1.lat)) * Math.cos(this.deg2rad(point2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    public convertTo(distance: number, units: string) {
        if (units === 'km') {
            return distance * 1.60934;
        }
        return distance / 1.60934;
    }

    private deg2rad(deg: number) {
        return deg * (Math.PI / 180)
    }
}
