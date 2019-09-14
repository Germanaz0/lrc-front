/**
 * Main Application
 *
 * @author Bortoli German <german@borto.li>
 */

import React from 'react';
import './App.css';

import Topbar from './components/Topbar/Topbar';
import Search from './components/Search/Search';

const App: React.FC = () => {
  return (
    <div className="App">
        <Topbar />
        <Search />
    </div>
  );
}

export default App;
