import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic or send to backend
    console.log({ email, password, rememberMe })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff5f2] px-4">
      <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
      <p className="text-gray-600 mb-6">Sign in to your account to continue</p>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl px-6 py-8 w-full max-w-md space-y-4"
      >
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
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium mb-1">Password</label>
            <Link to="/resetpassword" className="text-sm text-red-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50">
            <i className="fas fa-lock text-gray-500 mr-2"></i>
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-transparent outline-none flex-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="accent-red-500"
          />
          <label className="text-sm">Remember me</label>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center my-2">
          <hr className="flex-grow border-t" />
          <span className="mx-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
          <hr className="flex-grow border-t" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <i className="fab fa-google mr-2 text-lg text-red-500"></i>
          Continue with Google
        </button>

        {/* ✅ Sign Up Link */}
        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/Register" className="text-red-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>

      {/* Join as Seller Section */}
      <div className="mt-6 w-full max-w-md text-center px-6">
        <div className="bg-[#fff0e6] border border-orange-300 shadow-sm px-5 py-6 rounded-xl">
          <p className="text-sm text-gray-800 mb-2">Are you an artisan?</p>
          <Link
            to="/Registerasseller"
            className="inline-block bg-white border border-orange-500 text-orange-600 font-semibold px-4 py-2 rounded-lg hover:bg-orange-100 transition"
          >
            Join as Seller
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
