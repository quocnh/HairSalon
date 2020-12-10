//require("dotenv").config();
const config = require("../config/auth.config");
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: config.GEOCODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: config.GEOCODER_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
