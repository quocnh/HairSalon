/*jshint esversion: 6 */
const mongoose = require('mongoose');

const BecomeDistributor = new mongoose.model(
    "BecomeDistributor",
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
            type: String,
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
        status: {
            type: String,
            required: [false, 'application status']
        },
    })
);

module.exports = BecomeDistributor;