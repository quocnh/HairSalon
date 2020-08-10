/*jshint esversion: 6 */
const mongoose = require('../mongoose');
const GeoSchema = require('./common');

const CustomerSchema = new mongoose.Schema({
    accountId: {
        type: String,
        required: [true, 'Full name must be provided'],
        minlength: 3
    },
    full_name: { 
        type: String,  
        required: [true, 'Full name must be provided']
    },
    phone: {
        type: Number,
        required: [true, 'Full name must be provided']
    },
    email: {
        type: String,
        lowercase: true, 
        unique: true,
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    dob: { 
        type: Date , 
        required: [true, 'Date of birth must be provided']
    },
    gender: { 
        type: String , 
        required: [true, 'Gender must be provided']
    },
    geometry: GeoSchema
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;