import React, { useState, useEffect ,useContext } from 'react'; // Added useEffect
import { Link } from 'react-router-dom';
import { User, Store, Mail, Phone, Lock, Tags } from 'lucide-react';
import './SellerRegister.css';
import axios from 'axios';
import { content } from '../../context';

const SellerRegister = () => {
  const{backendurl , setisregisterasseller} = useContext(content);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');

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

  const handleSubmit = async(e) => {
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
    // IMPORTANT: Avoid alert() in production/Canvas environments. Use a custom modal or message display.
    alert('Seller Registration Data (shown in console)');

    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + '/api/auth/registerasseller', { name ,email, password ,category,description,businessName });
      if (data.succes) {
        setisregisterasseller(true);
        Navigate('/Home');//artisans dashboard
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }


  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register as a Seller</h1>
      <p className="register-subtext">
        Share your talent with the world! Create your artisan profile to start selling.
      </p>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <label htmlFor="fullName">Full Name</label> {/* Added htmlFor */}
          <div className="input-field">
            <User className="icon" />
            <input 
              type="text" 
              id="fullName" // Added id
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name" 
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="businessName">Business/Brand Name</label> {/* Added htmlFor */}
          <div className="input-field">
            <Store className="icon" />
            <input 
              type="text" 
              id="businessName" // Added id
              value={businessName} 
              onChange={(e) => setBusinessName(e.target.value)} 
              placeholder="E.g. Artisans-Craft" 
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label> {/* Added htmlFor */}
          <div className="input-field">
            <Mail className="icon" />
            <input 
              type="email" 
              id="email" // Added id
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email" 
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone Number</label> {/* Added htmlFor */}
          <div className="input-field">
            <Phone className="icon" />
            <input 
              type="tel" 
              id="phone" // Added id
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="Enter your phone number" 
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="category">Product Category</label> {/* Added htmlFor */}
          <div className="input-field">
            <Tags className="icon" />
            <select
              className="full-width-select"
              id="category" // Added id
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
          <label htmlFor="password">Password</label> {/* Added htmlFor */}
          <div className="input-field">
            <Lock className="icon" />
            <input 
              type="password" 
              id="password" // Added id
              value={password} 
              onChange={handlePasswordChange} 
              placeholder="Create a password" 
              required 
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label> {/* Added htmlFor */}
          <div className="input-field">
            <Lock className="icon" />
            <input 
              type="password" 
              id="confirmPassword" // Added id
              value={confirmPassword} 
              onChange={handleConfirmPasswordChange} 
              placeholder="Verify password" 
              required 
            />
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="description">Short Description</label> {/* Added htmlFor */}
          <textarea 
            id="description" // Added id
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows={3} 
            placeholder="Tell us a little about your work..." 
          />
        </div>

        <button type="submit" className="submit-button">Register as Seller</button>

        <p className="redirect-login">
          Already have an account? <Link to="/signin" className="login-link">Login</Link> {/* CORRECTED LINE */}
        </p>
      </form>
    </div>
  );
};

export default SellerRegister;