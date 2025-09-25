import React, { useState, useContext } from 'react';
import './Resetpassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { content } from '../../context';

const ResetPassword = () => {
  const [Email, setEmail] = useState('');
  const [resetotp, setOtp] = useState('');
  const [newpassword, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const navigate = useNavigate();
  const { backendurl } = useContext(content);

  const handleSendOtp = async () => {
    if (!Email) {
      setMessage('Please enter your email');
      return;
    }

    try {
      const res = await axios.post(`${backendurl}/api/auth/send-reset-otp`, { Email });
      if (res.data.success) {
        setOtpSent(true);
        setMessage('OTP sent to email');
      } else {
        setMessage(res.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleVerifyOtp = () => {
    if (!resetotp) {
      setMessage('Please enter OTP');
      return;
    }

    
    setOtpVerified(true);
    setMessage('OTP verified successfully');
  };

  const handleResendOtp = () => {
    handleSendOtp(); // Reuse the same function
    setMessage('OTP resent to your email');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newpassword || !ConfirmPassword) {
      setMessage('Please enter and confirm your new password');
      return;
    }

    if (newpassword !== ConfirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`${backendurl}/api/auth/resetpassword`, {
        Email,
        otp: resetotp,
        newpassword,
      });

      if (res.data.success) {
        setMessage('Password reset successfully');
        navigate('/signin');

      } else {
        setMessage(res.data.message || 'Password reset failed');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-form">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="reset-input"
        />

        {!otpSent && (
          <button type="button" onClick={handleSendOtp} className="reset-button">
            Send OTP
          </button>
        )}

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP sent to your email"
              value={resetotp}
              onChange={(e) => setOtp(e.target.value)}
              className="reset-input"
            />

            {!otpVerified && (
              <div className="otp-actions">
                <button type="button" onClick={handleVerifyOtp} className="reset-button">
                  Verify OTP
                </button>
                <button type="button" onClick={handleResendOtp} className="reset-button">
                  Resend OTP
                </button>
              </div>
            )}
          </>
        )}

        {otpVerified && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newpassword}
              onChange={(e) => setPassword(e.target.value)}
              className="reset-input"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="reset-input"
            />

            <button type="submit" className="reset-button">
              Reset Password
            </button>
          </>
        )}
      </form>

      {message && <p className="reset-message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
