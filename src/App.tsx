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
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
      <Router>
          <AuthProvider>
              <Navbar />
              <Routes>
                  <Route element={<PublicRoute />}>
                      <Route path="/login" element={<LoginRegister />}/>
                  </Route>
                  <Route element={<PrivateRoute />}>
                      <Route path="/" element={<Homepage />}/>
                      <Route path="/notifications" element={<Notifications />}/>
                      <Route path="/tradeoffers" element={<TradeOffers />}/>
                      <Route path="/itemcreation" element={<ItemCreation />}/>
                      <Route path="/profile" element={<Profile />}/>
                  </Route>
              </Routes>
          </AuthProvider>
      </Router>
  );
}

export default App;
