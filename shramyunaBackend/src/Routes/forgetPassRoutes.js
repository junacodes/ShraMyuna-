const express = require('express');
const { forgotPassword, resetPassword } = require('../Controller/forgetPassController');

const router = express.Router();

// Route to handle forgot password request
router.post('/forgot-password', forgotPassword);

// Route to handle password reset
router.post('/reset-password', resetPassword);

module.exports = router;