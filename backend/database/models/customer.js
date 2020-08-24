/*jshint esversion: 6 */
const mongoose = require('../mongoose');
const GeoSchema = require('./common');

const CustomerSchema = new mongoose.Schema({
    username: { 
        type: String,
        minlength: 3,
        required: [false, 'username must be provided']
    },

    firstname: { 
        type: String,
        required: [false, 'firstname']
    },

    lastname: { 
        type: String,
        required: [false, 'lastname']
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
    district: { 
        type: String,
        required: [false, 'district']
    },
    city: { 
        type: String,
        required: [false, 'city']
    },
    address: { 
        type: String,
        required: [false, 'address']
    },
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;