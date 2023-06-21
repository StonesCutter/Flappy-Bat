import React from 'react';
import { Route, Routes } from 'react-router-dom';

import EntryApp from '../screens/EntryApp';
import PageNotFound from '../screens/PageNotFound';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Tutorial from '../screens/Tutorial';
import Game from '../screens/Game';
import Ranking from '../screens/Ranking';
import Skin from '../screens/Skin';


function Routing (props) {
    return(
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Tutorial" element={<Tutorial/>}/>
            <Route path="/Game" element={<Game/>}/>
            <Route path="/Ranking" element={<Ranking/>}/>
            <Route path="/Skin" element={<Skin/>}/>
            <Route path="/EntryApp" element={<EntryApp/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}

export default Routing;