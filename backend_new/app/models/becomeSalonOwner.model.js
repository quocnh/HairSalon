/*jshint esversion: 6 */
const mongoose = require('mongoose');

const SalonOwner = new mongoose.model(
    "BecomeSalonOwner",
    new mongoose.Schema({
        _userId: {
            type: mongoose.Schema.Types.ObjectId,
            require: [true, 'User id'],
            unique: true,
            ref: "User"
        },
        username: {
            type: String,
            required: [false, 'username']
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
        salonQuantity: {
            type: Number,
            required: [false, 'Salon quantity']
        },
    })
);

module.exports = BecomeSalonOwner;