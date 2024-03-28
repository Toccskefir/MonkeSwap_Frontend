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
import HttpProvider from "./providers/HttpProvider";
import Inventory from "./components/Inventory";

function App() {
  return (
      <Router>
          <AuthProvider>
              <HttpProvider>
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
                          <Route path="/inventory" element={<Inventory />}/>
                          <Route path="/profile" element={<Profile />}/>
                      </Route>
                  </Routes>
              </HttpProvider>
          </AuthProvider>
      </Router>
  );
}

export default App;
