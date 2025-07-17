import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navigation from './components/navigation';
import './App.css';
import Home from './components/Home';
import Artisians from './components/artisians';
import SignIn from './components/login';
import RegisterAsSeller from './components/Registerasseller';
import ResetPassword from './components/resetpassword';

function AppContent() {
  const location = useLocation();
  const hideNavbarPaths = ['/signin', '/registerasseller', '/resetpassword'];

  return (
    <div className="app">
      {!hideNavbarPaths.includes(location.pathname) && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artisans" element={<Artisians />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/registerasseller" element={<RegisterAsSeller />} />
        <Route path="/resetpassword" element={<ResetPassword />} /> 
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
