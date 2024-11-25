
const express = require('express');
const { getCountries, getStatesByCountry } = require("../Controller/countryController")

const router = express.Router();

// Route to get all countries
router.get('/countries', getCountries);

// Route to get states by country code
router.get('/states/:countryCode', getStatesByCountry);

module.exports = router;