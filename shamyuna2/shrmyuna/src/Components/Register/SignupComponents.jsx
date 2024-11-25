import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData, // Corrected typo from 'userDate' to 'userData'
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!userData.username) errors.username = 'Username is required';
    if (!userData.email) errors.email = 'Email is required';
    if (!userData.password) errors.password = 'Password is required';
    if (!userData.confirmPassword) errors.confirmPassword = 'Confirm Password is required';
    if (userData.password !== userData.confirmPassword)
      errors.confirmPassword = 'Passwords must match';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
              "http://localhost:8000/api/user/register",
          {
            name: userData.username,
            email: userData.email,
            password: userData.password,
          }
        );
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        toast.error(error.response?.data?.msg || 'An error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen m-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <span className="sign text-2xl font-bold flex text-center text-gray-800 justify-center">
          Shra<h2 className="text-pink-700">MY</h2>una
        </span>
        <h2 className="text-center">Create an Account</h2>
        
        <ToastContainer />

        {errors.username && <p className="text-red-500 text-sm text-center">{errors.username}</p>}
        {errors.email && <p className="text-red-500 text-sm text-center">{errors.email}</p>}
        {errors.password && <p className="text-red-500 text-sm text-center">{errors.password}</p>}
        {errors.confirmPassword && <p className="text-red-500 text-sm text-center">{errors.confirmPassword}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full name"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword" // Updated to match `confirmPassword` in state and validation
              value={userData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Re-enter password"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>

          <div>
          
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;