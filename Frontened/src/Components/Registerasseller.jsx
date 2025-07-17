import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Store, Mail, Phone, Lock, Tags } from 'lucide-react';
import './SellerRegister.css';

const SellerRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');

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

    console.log({
      name,
      email,
      password,
      category,
      phone,
      businessName,
      description,
    });
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register as a Seller</h1>
      <p className="register-subtext">
        Share your talent with the world! Create your artisan profile to start selling.
      </p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label>Full Name</label>
          <div className="input-field">
            <User className="icon" />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
          </div>
        </div>

        <div className="input-group">
          <label>Business/Brand Name</label>
          <div className="input-field">
            <Store className="icon" />
            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="E.g. Artisans-Craft" required />
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <div className="input-field">
            <Mail className="icon" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <div className="input-field">
            <Phone className="icon" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required />
          </div>
        </div>

        <div className="input-group">
          <label>Product Category</label>
          <div className="input-field">
            <Tags className="icon" />
            <select
              className="full-width-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Pottery">Pottery</option>
              <option value="Textiles">Textiles</option>
              <option value="Woodwork">Woodwork</option>
              <option value="Painting">Painting</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-field">
            <Lock className="icon" />
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Create a password" required />
          </div>
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <div className="input-field">
            <Lock className="icon" />
            <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Verify password" required />
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="input-group">
          <label>Short Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Tell us a little about your work..." />
        </div>

        <button type="submit" className="submit-button">Register as Seller</button>

        <p className="redirect-login">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SellerRegister;
