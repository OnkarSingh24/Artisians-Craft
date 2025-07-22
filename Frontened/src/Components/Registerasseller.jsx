import React, { useState, useContext } from 'react';
import { Lock, Mail, User, Phone, MapPin, Briefcase, FileText } from 'lucide-react';
import "./SellerRegister.css";
import { content } from '../../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterAsSeller = () => {
  const navigate = useNavigate();
  const { backendurl, setisregisterasseller } = useContext(content);

  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Password: '',
    ConfirmPassword: '',
    Business: '',
    Address: '',
    Gstin: '',
    Pan: '',
    description: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.Password !== formData.ConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + '/api/auth/registerasseller', { formData });
      if (data.success) {
        setisregisterasseller(true);
        navigate('/artisandirectory');
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register as Seller</h1>
      <p className="register-subtext">Start your selling journey with us!</p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="Name">Name</label>
          <div className="input-field">
            <User className="icon" />
            <input
              type="text"
              id="Name"
              value={formData.Name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="Email">Email</label>
          <div className="input-field">
            <Mail className="icon" />
            <input
              type="email"
              id="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="Phone">Phone</label>
          <div className="input-field">
            <Phone className="icon" />
            <input
              type="tel"
              id="Phone"
              value={formData.Phone}
              onChange={handleChange}
              placeholder="Your Phone number"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="Password">Password</label>
          <div className="input-field">
            <Lock className="icon" />
            <input
              type="password"
              id="Password"
              value={formData.Password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <div className="input-field">
            <Lock className="icon" />
            <input
              type="password"
              id="ConfirmPassword"
              value={formData.ConfirmPassword}
              onChange={handleChange}
              placeholder="Verify Password"
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="Business">Business Name</label>
          <div className="input-field">
            <Briefcase className="icon" />
            <input
              type="text"
              id="Business"
              value={formData.Business}
              onChange={handleChange}
              placeholder="Your business name"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="Address">Business Address</label>
          <div className="input-field">
            <MapPin className="icon" />
            <input
              type="text"
              id="Address"
              value={formData.Address}
              onChange={handleChange}
              placeholder="Your Business address"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="Gstin">GSTIN</label>
          <div className="input-field">
            <FileText className="icon" />
            <input
              type="text"
              id="Gstin"
              value={formData.Gstin}
              onChange={handleChange}
              placeholder="Your GSTIN"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="Pan">PAN ID</label>
          <div className="input-field">
            <FileText className="icon" />
            <input
              type="text"
              id="Pan"
              value={formData.Pan}
              onChange={handleChange}
              placeholder="Your PAN ID"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="description">Short Description</label>
          <textarea
            id="description"
            value={formData.description}
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
