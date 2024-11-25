// controllers/countryController.js

const { countries, states } = require("../Models/countryModels")

// Get all countries
const getCountries = (req, res) => {
  res.json(countries);
};

// Get states by country code
const getStatesByCountry = (req, res) => {
  const { countryCode } = req.params;
  const countryStates = states[countryCode];

  if (countryStates) {
    res.json(countryStates.map(state => ({ code: state, name: state })));
  } else {
    res.status(404).json({ error: 'Country not found or no states available' });
  }
};

module.exports = {
  getCountries,
  getStatesByCountry,
};
