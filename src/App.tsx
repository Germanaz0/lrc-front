/**
 * Main Application
 *
 * @author Bortoli German <german@borto.li>
 */
import React, {useState, useEffect, useRef} from 'react'
import './App.css';
import {getCurrentLocation, GeoPosition} from './api-clients/navigator-location';
import FyiApliClient from './api-clients/findservices.api';
import Topbar from './components/Topbar/Topbar';
import Search from './components/Search/Search';

import axios from "axios";
import Login from "./components/Login/Login";

const DEFAULT_DISTANCE = process.env.REACT_APP_DEFAULT_DISTANCE || 10;

const App: React.FC = () => {

    const apiClient = new FyiApliClient();

    const [appStates, setAppStates] = useState({
        distance: 0,
        search: '',
        isLoggedIn: false,
        isLoading: true,
    });

    const [services, setServices] = useState([]);
    const [geoCenter, setGeoCenter] = useState({
        lat: 0,
        lng: 0,
    });

    const [loginOpen, setLoginOpen] = useState(false);

    /**
     * API Calls
     */
    useEffect(() => {
        let didCancel = false;
        async function fetchApi() {
            const response = await apiClient.listServices(appStates.distance, geoCenter);
            if (!didCancel) {
                setServices(response);
                console.log("Fetched services with distance", appStates.distance);
            }
        }
        fetchApi();
        return () => { didCancel = true; };
    }, [appStates.distance, geoCenter]);

    /**
     * Geolocation enabled
     */
    useEffect(() => {
        getCurrentLocation()
            .then((data: GeoPosition) => {
                setDistance(DEFAULT_DISTANCE.toString());
                setGeoCenter({lat: data.coords.latitude, lng: data.coords.longitude});
            })
            .catch(() => {
                // setDistance('0');
            });
    }, []);


    /**
     * Will trigger a modalbox to login
     */
    const handleLogin = () => {
        setLoginOpen(true);
    };

    /**
     * Will trigger logout action
     */
    const handleLogout = () => {
        alert("LOGOUT !!");
    };

    /**
     * Will trigger modalbox to add a service
     */
    const handleAddService = () => {
        alert('ADD SERVICE MODAL');
    };

    const handleCloseModal = () => {
        setLoginOpen(false);
    };

    /**
     * Set distance to filter services
     * @param distance
     */
    const setDistance = (distance: string) => {
        console.log('Setting distance to:', distance);
        setAppStates({...appStates, 'distance': parseInt(distance)});
    };

    /**
     * Set search keyword to filter services
     * @param search
     */
    const setSearchText = (search: string) => {
        console.log('Searching text:', search);
        setAppStates({...appStates, search});
    };

    /**
     * Set logged in status
     * @param isLoggedIn
     */
    const setLoggedIn = (isLoggedIn: boolean) => {
        console.log('Setting login status:', isLoggedIn);
        setAppStates({...appStates, isLoggedIn});
    };

    /**
     * Will search by distance
     * @param event
     */
    const handleDistance = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDistance(event.target.value);
    };

    /**
     * Will handle the serach text
     * @param event
     */
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="App">
            <Topbar
                isLoggedIn={appStates.isLoggedIn}
                distance={appStates.distance}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                handleSearch={handleSearch}
                handleDistance={handleDistance}
            />

            <Search
                isLoggedIn={appStates.isLoggedIn}
                handleAddService={handleAddService}
                services={services}
                center={geoCenter}
            />

            <Login open={loginOpen} closeModal={handleCloseModal}/>
        </div>
    );
};

export default App;
