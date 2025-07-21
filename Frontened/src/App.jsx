import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'; // ✅ removed BrowserRouter
import Navigation from './Components/navigation';
import Home from './Components/Home';
import Artisians from './Components/artisians';
import SignIn from './Components/Login';
import RegisterAsSeller from './Components/Registerasseller';
import ResetPassword from './Components/resetpassword';
import ArtisanDirectory from './Components/ArtisanDirectory';
import Register from './Components/Register';
import Shop from './Components/Shop';
import Dashboard from './Components/Dashboard';

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
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/registerasseller" element={<RegisterAsSeller />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/artisandirectory" element={<ArtisanDirectory />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
