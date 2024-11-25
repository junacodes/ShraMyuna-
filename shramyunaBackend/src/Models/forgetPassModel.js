// models/userModel.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../Models/userModels'); // Assume User model interacts with your database

// Function to find a user by email
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email }); // Replace with your DB query logic
  return user;
};

// Function to update user password
const updateUserPassword = async (userId, hashedPassword) => {
  const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
  return user;
};

// Function to generate reset token
const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { findUserByEmail, updateUserPassword, generateResetToken };