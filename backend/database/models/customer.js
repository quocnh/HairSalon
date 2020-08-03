/*jshint esversion: 6 */
const mongoose = require('../mongoose');

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3
    }
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;