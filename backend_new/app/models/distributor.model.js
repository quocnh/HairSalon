/*jshint esversion: 6 */
const mongoose = require('mongoose');

const DistributorSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, 'User id'],
        unique: true,
        ref: "User"
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
        required: [false, 'Phone number must be provided']
    },
    email: {
        type: String,
        lowercase: false,
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

const Distributor = mongoose.model('Distributor', DistributorSchema);
module.exports = Distributor;