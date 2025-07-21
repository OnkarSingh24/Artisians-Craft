import React, { useState } from 'react';
import { Lock, Mail, User, Phone, MapPin, Briefcase, FileText } from 'lucide-react';
import "./SellerRegister.css";

const RegisterAsSeller = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Password: '',
    ConfirmPassword: '',
    BusinessName: '',
    Address: '',
    Gstin: '',
    PanId: '',
    ShortDescription: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Password !== formData.ConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    console.log(formData);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register as Seller</h1>
      <p className="register-subtext">Start your selling journey with us!</p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <div className="input-field">
            <User className="icon" />
            <input
              type="text"
              id="name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <div className="input-field">
            <Mail className="icon" />
            <input
              type="email"
              id="email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <div className="input-field">
            <Phone className="icon" />
            <input
              type="tel"
              id="phone"
              value={formData.Phone}
              onChange={handleChange}
              placeholder="Your Phone number"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-field">
            <Lock className="icon" />
            <input
              type="password"
              id="password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="input-field">
            <Lock className="icon" />
            <input
              type="password"
              id="confirmPassword"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              placeholder="Verify Password"
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="businessName">Business Name</label>
          <div className="input-field">
            <Briefcase className="icon" />
            <input
              type="text"
              id="businessName"
              value={formData.BusinessName}
              onChange={handleChange}
              placeholder="Your business name"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="address">Business Address</label>
          <div className="input-field">
            <MapPin className="icon" />
            <input
              type="text"
              id="address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Your Business address"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="gstin">GSTIN</label>
          <div className="input-field">
            <FileText className="icon" />
            <input
              type="text"
              id="gstin"
              value={formData.Gstin}
              onChange={handleChange}
              placeholder="Your GSTIN"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="panId">PAN ID</label>
          <div className="input-field">
            <FileText className="icon" />
            <input
              type="text"
              id="panId"
              value={formData.PanId}
              onChange={handleChange}
              placeholder="Your PAN ID"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            id="shortDescription"
            value={formData.ShortDescription}
            onChange={handleChange}
            rows="3"
            placeholder="Tell us about your business"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>

        <p className="redirect-login">
          Already have an account?{' '}
          <a href="/signin" className="login-link">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterAsSeller;
