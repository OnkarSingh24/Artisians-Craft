import React, { useContext ,createContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { content } from '../../context';
import axios from 'axios';
//import Home from "./Home.jsx";

const Register = () => {
 const{backendurl , setisregister} = useContext(content);
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

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
    if (Password !== e.target.value) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (Password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const formData = { Name, Email, Password, accountVerified: false };
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + '/api/auth/register', { Name ,Email, Password });
      if (data.succes) {
        setisregister(true);
        Navigate('/Home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }


  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create an Account</h1>
      <p className="register-subtitle">Sign up to explore handmade products</p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Name</label>
          <div className="input-wrapper">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Enter your name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <div className="input-wrapper">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Enter your email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Create a password"
              value={Password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-wrapper">
            <i className="fas fa-lock"></i>
            <input
              type="password"
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
          Already have an account? <Link to="/signin">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
