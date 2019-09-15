/**
 * Main Application
 *
 * @author Bortoli German <german@borto.li>
 */
import React, {useState, useEffect} from 'react'
import {getCurrentLocation, GeoPosition} from './api-clients/navigator-location';
import apiClient from './api-clients/findservices.api';
import Topbar from './components/Topbar/Topbar';
import Search from './components/Search/Search';

import Login from "./components/Login/Login";

const DEFAULT_DISTANCE = process.env.REACT_APP_DEFAULT_DISTANCE || 10;

const App: React.FC = () => {

    /**
     * States of the app
     */
    const [appStates, setAppStates] = useState({
        distance: 0,
        search: '',
        isLoggedIn: apiClient.isLoggedIn(),
        isLoading: true,
    });

    /**
     * Service array, fetched from the api
     */
    const [services, setServices] = useState([]);

    /**
     * Current user geoposition
     */
    const [geoCenter, setGeoCenter] = useState({
        lat: localStorage.getItem('center_lat')  || 0,
        lng: localStorage.getItem('center_lng') || 0,
    });

    /**
     * Login status
     */
    const [loginOpen, setLoginOpen] = useState(false);

    /**
     * Fetch services from API
     */
    const refreshServices = () => {
        return apiClient.listServices(appStates.distance, geoCenter);
    };

    const updateServicesList = () => {
        return refreshServices().then((services) => setServices(services));
    };

    /**
     * This is used when filtering by distance and current location
     */
    useEffect(() => {
        let didCancel = false;
        async function fetchApi() {
            const response = await refreshServices();
            if (!didCancel) {
                setServices(response);
                console.log("Fetched services with distance", appStates.distance);
            }
        }
        fetchApi();
        return () => { didCancel = true; };
    }, [appStates.distance, geoCenter]);

    /**
     * Geolocation: Fetch current user location
     */
    useEffect(() => {
        getCurrentLocation()
            .then((data: GeoPosition) => {
                setDistance(DEFAULT_DISTANCE.toString());
                localStorage.setItem('center_lat', data.coords.latitude.toString());
                localStorage.setItem('center_lng', data.coords.longitude.toString());
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
        apiClient.logout().then(() => {
            apiClient.clearSession();
            setLoggedIn(false);
        });
    };

    /**
     * Will close any modal
     */
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
                services={services}
                center={geoCenter}
                refreshServices={updateServicesList}
            />

            <Login open={loginOpen} closeModal={handleCloseModal} setLoggedIn={setLoggedIn}/>
        </div>
    );
};

export default App;
