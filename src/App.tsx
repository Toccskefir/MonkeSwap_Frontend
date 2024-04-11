import React from 'react';
import './App.css';
import LoginRegister from './components/LoginRegister';
import CreateItem from './components/CreateItem';
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
import Footer from "./components/Footer";
import UserDataProvider from "./providers/UserDataProvider";

function App() {
  return (
      <Router>
          <AuthProvider>
              <HttpProvider>
                  <UserDataProvider>
                      <Navbar />
                      <Routes>
                          <Route element={<PublicRoute />}>
                              <Route path="/login" element={<LoginRegister />}/>
                          </Route>
                          <Route element={<PrivateRoute />}>
                              <Route path="/" element={<Homepage />}/>
                              <Route path="/notifications" element={<Notifications />}/>
                              <Route path="/tradeoffers" element={<TradeOffers />}/>
                              <Route path="/createitem" element={<CreateItem />}/>
                              <Route path="/inventory" element={<Inventory />}/>
                              <Route path="/profile" element={<Profile />}/>
                          </Route>
                      </Routes>
                      <Footer />
                  </UserDataProvider>
              </HttpProvider>
          </AuthProvider>
      </Router>
  );
}

export default App;
