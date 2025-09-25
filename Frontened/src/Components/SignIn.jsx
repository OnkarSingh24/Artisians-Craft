import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import './Signin.css';
import axios from 'axios';
import { content } from '../../context';
import { NavContext, NavProvider } from './NavContext';

const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setisloggedin ,setuserdata , setSellerData} = useContext(content);
  const { setUser } = useContext(NavContext); 

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + '/api/auth/login', { Email, Password });
 console.log("Login API response", data);
      if (data.success) {
       

        setisloggedin(true);
        setuserdata(data.user);
        setSellerData(data.user);
        setUser({ email: Email, role: data.role }); 

        


        switch (data.role) {
          case 'admin':
            navigate('/admindashboard');
            break;
          case 'seller' :
            navigate('/artisanDashboard')
            break;
          default:
            navigate('/');
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title">Sign In to Your Account</h2>
        <p className="subtitle">Access your dashboard and manage your crafts</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group input-with-icon">
            <label>Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                placeholder="you@example.com"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group input-with-icon">
            <div className="label-row">
              <label>Password</label>
              <Link to="/resetpassword" className="link-sm">Forgot Password?</Link>
            </div>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                placeholder="Your secure password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label>Remember me</label>
          </div>

          <button type="submit" className="btn-primary">Login</button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <button className="btn-google">
            <i className="fab fa-google"></i> Google
          </button>

          <p className="bottom-text">
            Don’t have an account? <Link to="/Register" className="link-highlight">Sign up</Link>
          </p>
        </form>

        <div className="seller-section">
          <p className="seller-text">Are you an Artisan?</p>
          <Link to="/registerasseller" className="btn-secondary">
            Register as Seller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
