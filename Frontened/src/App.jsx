import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/navigation';
import Home from './components/Home';
import Artisians from './components/artisians';
import SignIn from './components/Login'; // This is your Login component
import RegisterAsSeller from './components/Registerasseller';
import ResetPassword from './components/resetpassword';
import ArtisanDirectory from './components/ArtisanDirectory';
import Register from './components/Register'; // This is your Register component

import './App.css';

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/signin', '/registerasseller', '/resetpassword', '/Register'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  useEffect(() => {
    const navHeight = 64; 

    if (showNavbar) {
      document.body.style.paddingTop = `${navHeight}px`;
    } else {
      document.body.style.paddingTop = '0';
    }

    return () => {
      document.body.style.paddingTop = '0';
    };
  }, [showNavbar]);

  return (
    <div className="app">
      {showNavbar && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisians />} />
        <Route path="/signin" element={<SignIn />} /> {/* This route is correct for Login.jsx */}
        <Route path="/registerasseller" element={<RegisterAsSeller />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/artisandirectory" element={<ArtisanDirectory />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
