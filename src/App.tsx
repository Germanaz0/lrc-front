import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
