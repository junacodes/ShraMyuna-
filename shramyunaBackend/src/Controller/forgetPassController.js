// controllers/authController.js
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const { findUserByEmail, updateUserPassword, generateResetToken } = require('../Models/forgetPassModel');
const transporter = require('../middleware/nodeMailer');

// Controller for handling forgot password
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate password reset token
    const token = generateResetToken(user.id);

    // Send the reset token via email
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Please click the following link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing request', error });
  }
};

// Controller for handling password reset
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserByEmail(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await updateUserPassword(user.id, hashedPassword);
    res.status(200).json({ message: 'Password successfully updated' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token', error });
  }
};

module.exports = { forgotPassword, resetPassword };
