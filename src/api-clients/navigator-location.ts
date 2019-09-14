/**
 * Navigator geolocation
 *
 * @description This package will interact with the geolocation api from the browser
 * @author Bortoli German <german@borto.li>
 */

export interface GeoCoords {
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: any;
    latitude: number;
    longitude: number;

}

export interface GeoPosition {
    coords: GeoCoords;
    timestamp: number;
}

export function getCurrentLocation(): Promise<GeoPosition> {
    const geolocation = window.navigator.geolocation;

    return new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }

        geolocation.getCurrentPosition(
            (position) => resolve(position),
            () => reject(new Error('Permission denied'))
        );
    })
}