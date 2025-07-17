import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !otp || !newPassword || !confirmPassword) {
      setMessage('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    console.log({
      email,
      otp,
      newPassword
    });

    setMessage('Password reset request sent');
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-form">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="reset-input"
        />
        <input
          type="text"
          placeholder="Enter OTP sent to your email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="reset-input"
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="reset-input"
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="reset-input"
        />

        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>

      {message && (
        <p className="reset-message">{message}</p>
      )}
    </div>
  );
};

export default ResetPassword;
