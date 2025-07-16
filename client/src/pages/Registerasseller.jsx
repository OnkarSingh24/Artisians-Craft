import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SellerRegister = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [category, setCategory] = useState('')
  const [phone, setPhone] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [description, setDescription] = useState('')

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

    console.log({
      name,
      email,
      password,
      category,
      phone,
      businessName,
      description,
    })
    // Add API call here
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffaf5] px-4">
      <h1 className="text-3xl font-bold mb-2">Register as a Seller</h1>
      <p className="text-gray-600 mb-6 text-center">
        Share your talent with the world! Create your artisan profile to start selling.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-6 py-8 w-full max-w-xl space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
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

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Business/Brand Name</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-store text-gray-500 mr-2"></i>
            <input
              type="text"
              placeholder="E.g. Artisans-Craft"
              className="bg-transparent outline-none flex-1"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
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

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-phone text-gray-500 mr-2"></i>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="bg-transparent outline-none flex-1"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Product Category</label>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-tags text-gray-500 mr-2"></i>
            <input
              type="text"
              placeholder="E.g. Jewelry, Pottery, Paintings"
              className="bg-transparent outline-none flex-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Short Description</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 outline-none resize-none"
            placeholder="Tell us a little about your work..."
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Register as Seller
        </button>

        {/* Redirect to Login */}
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

export default SellerRegister
