import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react'; // Ensure these are imported if used
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Effect to manage body scroll for this page
  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const formData = { name, email, password, accountVerified: false };
    console.log('User Registration Data:', formData);
    
    alert('User registered (data shown in console)'); 
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create an Account</h1>
      <p className="register-subtitle">Sign up to explore handmade products</p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className="input-wrapper">
            <User className="input-icon" size={20} />
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={20} />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Verify password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/signin">Login</Link> {/* CORRECTED LINE */}
        </p>
      </form>
    </div>
  );
};

export default Register;
