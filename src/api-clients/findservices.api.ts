/**
 * Find your service API Client
 *
 * @description This package will interact with the fys api
 * @author Bortoli German <german@borto.li>
 */
import axios from 'axios';
import {ReactText} from "react";
const API_URL = process.env.REACT_APP_API_SERVICES_URL;

export interface GeolocationPoint {
    type: string;
    coordinates: number[];
}

export interface GeolocationFormPoint {
    lat: number | string | ReactText;
    lng: number | string | ReactText;
}

export interface ServiceType {
    id: number;
    created_at: string;
    updated_at: string;
    title: string;
    description?: string;
    address: string;
    country: string;
    city: string;
    state: string;
    zip_code: string;
    geolocation: GeolocationPoint;
}

export interface ServiceTypeForm extends Omit<ServiceType, 'geolocation'>{
    geolocation: GeolocationFormPoint;
}

export interface GeoCenter {
    lat: number | string | ReactText;
    lng: number | string | ReactText;
}

export interface AuthToken {
    access_token: string | null;
    expires_at: string | null;
    token_type: string | null;
}

export interface AuthResponse {
    data: AuthToken;
}

export class FindYourServiceApiClient {
    auth: AuthToken = {
        access_token: '',
        expires_at: '',
        token_type: '',
    };

    /**
     * Main constructor
     */
    constructor() {
        this.auth.access_token = localStorage.getItem('lrc.access_token');
        this.auth.expires_at = localStorage.getItem('lrc.expires_at');
        this.auth.token_type = localStorage.getItem('lrc.token_type');
    }

    /**
     * Set logged in headers
     */
    getLoggedInHeaders = () => {
        if (!this.isLoggedIn()) {
            return {};
        }

        return {
            'Authorization': `Bearer ${this.auth.access_token}`,
            'Accept': 'application/json',
        };
    };
    /**
     * List services index
     * @param distance
     * @param center
     */
    listServices = (distance?: number | ReactText, center?: GeoCenter) => {
        let lat : number | string | ReactText = 0;
        let lng : number | string | ReactText = 0;

        if (center) {
            lat = center.lat;
            lng = center.lng;
        }

        const baseUrl = `${API_URL}services?distance=${distance}&lat=${lat}&lng=${lng}`;
        return axios.get(baseUrl)
            .then(response => response.data.data);
    };

    /**
     * Login action
     */
    login = (email: string, password: string) => {
        return axios
            .post(`${API_URL}auth/login`, {email, password});
    };

    /**
     * Trigger logout
     */
    logout = () => {
        //auth/logout
        return axios.post(`${API_URL}auth/logout`, {},{
            headers: this.getLoggedInHeaders(),
        })
    };

    /**
     * Delete a service action
     * @param service
     */
    deleteService = (service: ServiceType) => {
        return axios.delete(`${API_URL}services/${service.id}`, {
            headers: this.getLoggedInHeaders(),
        });
    };

    /**
     * Update a service
     * @param service
     */
    updateService = (service: ServiceTypeForm) => {
        return axios.patch(`${API_URL}services/${service.id}`, service, {
            headers: this.getLoggedInHeaders(),
        });
    };

    /**
     * Update a service
     * @param service
     */
    createService = (service: ServiceTypeForm) => {
        return axios.post(`${API_URL}services`, service, {
            headers: this.getLoggedInHeaders(),
        });
    };

    /**
     * Create or update a service
     * @param service
     */
    createOrUpdate = (service: ServiceTypeForm) => {
        if (service.id && service.id > 0) {
            return this.updateService(service);
        }

        return this.createService(service);
    };

    /**
     * Check if the user is logged in
     */
    isLoggedIn = () => {
        if (!this.auth.access_token) {
            return false;
        }

        // @TODO: Validate if the token has been expired

        return this.auth.access_token.length > 0;
    };

    /**
     * Store auth response into browser session
     * @param response
     */
    storeSession = (response: any) => {
        localStorage.setItem('lrc.access_token', response.data.access_token);
        localStorage.setItem('lrc.expires_at', response.data.expires_at);
        localStorage.setItem('lrc.token_type', response.data.token_type);

        this.auth.access_token = response.data.access_token;
        this.auth.expires_at = response.data.expires_at;
        this.auth.token_type = response.data.token_type;
    };

    /**
     * Clear browser session
     */
    clearSession = () => {
        localStorage.removeItem('lrc.access_token');
        localStorage.removeItem('lrc.expires_at');
        localStorage.removeItem('lrc.token_type');

        this.auth.access_token = null;
        this.auth.expires_at = null;
        this.auth.token_type = null;
    };

}
const apiClient = new FindYourServiceApiClient();
export default apiClient;