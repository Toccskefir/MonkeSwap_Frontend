import React from 'react';
import './App.css';
import LoginRegister from './components/LoginRegister';
import ItemCreation from './components/ItemCreation';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Notifications from "./components/Notifications";
import TradeOffers from "./components/TradeOffers";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
            <Route path="/homepage" element={<Homepage/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
            <Route path="/tradeoffers" element={<TradeOffers/>}/>
            <Route path="/itemcreation" element={<ItemCreation/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </Router>
  );
}

export default App;
