import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing the eye icons

const LoginComponents = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [errors, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!loginData.email) errors.email = 'Email is required';
    if (!loginData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setError(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/user/login',
          loginData
        );
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', user.userRole); // Set only once

        navigate('/sale'); // Navigate to '/sale' after login
        toast.success('Login successful');
      } catch (error) {
        console.error(error.response?.data?.msg || 'An error occurred during login.');
        toast.error(error.response?.data?.msg || 'An error occurred during login.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        {errors && (
          <div className="text-red-500 text-center">
            {Object.values(errors).map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700">Password</label>
           
           <input
     type={showPassword ? 'text' : 'password'} // Show or hide based on the state
    name="password"
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
    value={loginData.password}
    onChange={handleChange}
    required
  />
  <button
    type="button"
    className="absolute right-3 top-1/2 transform -translate-y-1/2 m-3 text-gray-500"
    onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon */}
  </button>
          </div>
          <div className="flex justify-between items-center ">
            <label className="flex items-center">
              <input type="checkbox" className="p-2" />
              Keep me logged in
            </label>
            <Link to="/forgot" className="text-blue-500 hover:underline ">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <Link to="/signUp" className="text-center block mt-3 text-blue-500 hover:underline">
            Create an account
          </Link>
          <button
            type="button"
            className="w-full text-black py-2 rounded-lg border border-solid border-black mt-3 hover:bg-gray-100 transition duration-300"
          >
            Login with Google
          </button>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-3"
          >
            Login with Facebook
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponents;
