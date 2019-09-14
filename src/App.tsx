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
    /**
     * distance, searchText, isLoggedIn
     */
    const isLoggedIn = false;
    return (
        <div className="App">
            <Topbar isLoggedIn={isLoggedIn}/>
            <Search isLoggedIn={isLoggedIn}/>
        </div>
    );
}

export default App;
