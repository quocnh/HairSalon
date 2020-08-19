/*jshint esversion: 6 */
const mongoose = require('../mongoose');
const GeoSchema = require('./common');

const CustomerSchema = new mongoose.Schema({
    username: { 
        type: String,
        trim: true,
        minlength: 3,
        required: [true, 'Full name must be provided']
    },

    fullname: { 
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
        required: [false, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    dob: { 
        type: Date,
        required: [false, 'Date of birth must be provided']
    },
    gender: { 
        type: String , 
        required: [false, 'Gender must be provided']
    },
    geometry: GeoSchema
    
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;