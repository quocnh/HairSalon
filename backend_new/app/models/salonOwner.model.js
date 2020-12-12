/*jshint esversion: 6 */
const mongoose = require('mongoose');

const SalonOwnerSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        require: [true, 'User id']
    },
    name: { 
        type: String,
        required: [false, 'name']
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
        required: [true, 'Phone number must be provided']
    },
    email: {
        type: String,
        lowercase: true,
        required: [false, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
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
    avatar: {
        type: String,
        require: [false, 'profile avatar']
    }
});

const SalonOwner = mongoose.model('SalonOwner', SalonOwnerSchema);
module.exports = SalonOwner;