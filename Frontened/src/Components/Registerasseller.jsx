import React, { useState, useContext } from 'react';
import { Lock, Mail, User, Phone, MapPin, Briefcase, FileText } from 'lucide-react';
import "./SellerRegister.css";
import { content } from '../../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterAsSeller = () => {
  const navigate = useNavigate();
  const { backendurl, setisregisterasseller, setSellerData, fetchSellerData } = useContext(content);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    phone: '',
    Password: '',
    ConfirmPassword: '',
    Buissness: '',
    Address: '',
    category: '',
    Gstin: '',
    Pan: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    setError('');
    setMessage('');
  };

  const handleNext = () => {
    setError('');

    if (currentStep === 1) {
      if (!formData.Name || !formData.Email || !formData.phone || !formData.Password || !formData.ConfirmPassword) {
        setError('Please fill all fields in Personal Information.');
        return;
      }
      if (formData.Password !== formData.ConfirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.Buissness || !formData.Address || !formData.category) {
        setError('Please fill all fields in Business Information.');
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setError('');
    setMessage('');
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (currentStep === 3) {
      if (!formData.Gstin || !formData.Pan || !formData.description) {
        setError('Please fill all fields in Legal & Description.');
        return;
      }
    }

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + '/api/auth/registerasseller', { formData });
      if (data.success) {
        setMessage('Registration successful! Redirecting to dashboard...');
        setisregisterasseller(true);
        setSellerData(data.seller);
        setTimeout(() => {
          navigate('/artisanDashboard');
        }, 1500);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred during registration: ' + (error.response?.data?.message || error.message));
    }
  };

  const totalSteps = 3;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="main-container">
      <div className="seller-intro-container">
        <div className="join-community-badge">
          <span role="img" aria-label="sparkle">✨</span>
          Join Our Artisan Community
        </div>
        <h1 className="main-title">
          Become a <span className="highlight">Seller</span> on CraftedArt
        </h1>
        <p className="subtitle">
          Share your passion with the world. Join thousands of artisans who are building successful businesses on our platform.
        </p>
        <div className="features-container">
          <div className="feature-card">
            <div className="icon-container green-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon"><path d="M3 3v18h18" /><path d="m18 9-5 5-4-4-3 3" /></svg>
            </div>
            <h3 className="feature-title">Grow Your Business</h3>
            <p className="feature-description">
              Reach customers worldwide and scale your craft business
            </p>
          </div>
          <div className="feature-card">
            <div className="icon-container blue-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="feature-title">Join Community</h3>
            <p className="feature-description">
              Connect with fellow artisans and art lovers
            </p>
          </div>
          <div className="feature-card">
            <div className="icon-container purple-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-icon"><path d="m15.4 17.7-6.2 3.8L7 18.2l-2.2 1.4-6.2 3.8L5.4 12 1 7.2l6.2-3.8 2.2-1.4 6.2 3.8 2.2 1.4 6.2-3.8L18.6 12l4.4 5.2-6.2-3.8-2.2-1.4z"/><path d="m15.4 17.7-6.2 3.8L7 18.2l-2.2 1.4-6.2 3.8L5.4 12 1 7.2l6.2-3.8 2.2-1.4 6.2 3.8 2.2 1.4 6.2-3.8L18.6 12l4.4 5.2-6.2-3.8-2.2-1.4z"/></svg>
            </div>
            <h3 className="feature-title">Get Recognized</h3>
            <p className="feature-description">
              Showcase your talent and build your reputation
            </p>
          </div>
        </div>
      </div>

      <div className="register-container">
        <div className="application-progress">
          <div className="progress-header">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{currentStep === 1 ? 'Personal Information' : currentStep === 2 ? 'Business Details' : 'Legal & Description'}</span>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <div className="progress-steps">
            <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
              <div className="step-icon">1</div>
              <div className="step-label">Personal</div>
            </div>
            <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
              <div className="step-icon">2</div>
              <div className="step-label">Business</div>
            </div>
            <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
              <div className="step-icon">3</div>
              <div className="step-label">Legal</div>
            </div>
          </div>
        </div>

        <div className="form-card">
          {currentStep === 1 && (
            <form onSubmit={(e) => e.preventDefault()}>
              <h2 className="form-title">Personal Information</h2>
              <p className="form-subtitle">Tell us about yourself to get started.</p>
              
              {error && <p className="error-text">{error}</p>}
              {message && <p className="success-text">{message}</p>}

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
                <label htmlFor="phone">Phone</label>
                <div className="input-field">
                  <Phone className="icon" />
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
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
              </div>

              <div className="form-navigation">
                <button type="button" className="next-button" onClick={handleNext}>
                  Next
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={(e) => e.preventDefault()}>
              <h2 className="form-title">Business Information</h2>
              <p className="form-subtitle">Tell us about your business.</p>

              {error && <p className="error-text">{error}</p>}
              {message && <p className="success-text">{message}</p>}

              <div className="input-group">
                <label htmlFor="Buissness">Business Name</label>
                <div className="input-field">
                  <Briefcase className="icon" />
                  <input
                    type="text"
                    id="Buissness"
                    value={formData.Buissness}
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
                <label htmlFor="category">Category</label>
                <div className="input-field">
                  <FileText className="icon" />
                  <input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Eg: Handcrafts, Artworks, etc."
                    required
                  />
                </div>
              </div>

              <div className="form-navigation">
                <button type="button" className="previous-button" onClick={handlePrevious}>
                  Previous
                </button>
                <button type="button" className="next-button" onClick={handleNext}>
                  Next: Legal & Description
                </button>
              </div>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="form-title">Legal & Description</h2>
              <p className="form-subtitle">Provide legal details and a short description.</p>

              {error && <p className="error-text">{error}</p>}
              {message && <p className="success-text">{message}</p>}

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
                  rows="4"
                  placeholder="Tell us about your business, products, and unique selling points."
                  required
                />
              </div>

              <div className="form-navigation">
                <button type="button" className="previous-button" onClick={handlePrevious}>
                  Previous
                </button>
                <button type="submit" className="submit-button">
                  Register
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="redirect-login">
          Already have an account?{' '}
          <a href="/signin" className="login-link">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterAsSeller;
