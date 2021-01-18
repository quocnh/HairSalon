/*jshint esversion: 6 */
const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Types.ObjectId,
        require: [false, 'User id']
    },
    _salonId: {
        type: mongoose.Types.ObjectId,
        require: [true, 'Salon id']
    },

    username: { 
        type: String,
        minlength: 3,
        required: [false, 'username ']
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
        type: String,
        required: [true, 'Phone number must be provided']
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
    profile: { 
        type: String,
        required: [false, 'Barber Profile']
    },
    avatar: {
        type: String,
        require: [false, 'profile avatar']
    },
    hometown: {
        type: String,
        require: [false, 'hometown info']
    },
    idcard: {
        type: String,
        require: [false, 'CMND']
    }
});

const Barber = mongoose.model('Barber', BarberSchema);
module.exports = Barber;