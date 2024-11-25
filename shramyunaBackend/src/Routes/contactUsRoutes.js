const express  = require('express');
const { submitContactForm } = require('../Controller/contactUsController');
const router = express.Router();

router.post('/contact', submitContactForm);
module.exports = router;