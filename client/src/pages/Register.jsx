import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError('Passwords do not match')
    } else {
      setError('')
    }
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      setError('Passwords do not match')
    } else {
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const formData = {
      name,
      email,
      password,
      accountVerified: false
    }

    console.log('User Registration Data:', formData)
    alert('User registered (data shown in console)')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff5f2] px-4">
      <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
      <p className="text-gray-600 mb-6">Sign up to explore handmade products</p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-6 py-8 w-full max-w-md space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-user text-gray-500 mr-2"></i>
            <input
              type="text"
              placeholder="Enter your name"
              className="bg-transparent outline-none flex-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-envelope text-gray-500 mr-2"></i>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-lock text-gray-500 mr-2"></i>
            <input
              type="password"
              placeholder="Create a password"
              className="bg-transparent outline-none flex-1"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Confirm Password</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-lock text-gray-500 mr-2"></i>
            <input
              type="password"
              placeholder="Verify password"
              className="bg-transparent outline-none flex-1"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/Login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
