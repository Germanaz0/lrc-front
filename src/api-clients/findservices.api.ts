/**
 * Find your service API Client
 *
 * @description This package will interact with the fys api
 * @author Bortoli German <german@borto.li>
 */
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_SERVICES_URL;

export interface GeolocationPoint {
    type: string;
    coordinates: number[];
}

export interface ServiceType {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description?: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    geolocation: GeolocationPoint;
}

export interface GeoCenter {
    lat: number;
    lng: number;
}

export default class FyiApliClient {

    listServices = (distance?: number, center?: GeoCenter) => {
        let lat = 0;
        let lng = 0;

        if (center) {
            lat = center.lat;
            lng = center.lng;
        }

        const baseUrl = `${API_URL}services?distance=${distance}&lat=${lat}&lng=${lng}`;
        return axios.get(baseUrl)
            .then(response => response.data.data);
    };
}