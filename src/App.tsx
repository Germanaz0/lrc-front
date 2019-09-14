/**
 * Main Application
 *
 * @author Bortoli German <german@borto.li>
 */
import React, {useState, useEffect} from 'react'
import './App.css';

import Topbar from './components/Topbar/Topbar';
import Search from './components/Search/Search';

const App: React.FC = () => {

    const [appStates, setAppStates] = React.useState({
        distance: 0,
        search: '',
        isLoggedIn: false,
        isLoading: true,
    });

    // const [services, setServices] = React.useState([]);

    /**
     * Will trigger a modalbox to login
     */
    const handleLogin = () => {
        alert("LOGIN MODAL");
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

    const setDistance = (distance: string) => {
        console.log('Setting distance to:', distance);
        setAppStates({ ...appStates, 'distance': parseInt(distance) });
    };

    const setSearchText = (search: string) => {
        console.log('Searching text:', search);
        setAppStates({ ...appStates, search });
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
            <Search isLoggedIn={appStates.isLoggedIn} handleAddService={handleAddService}/>
        </div>
    );
}

export default App;
