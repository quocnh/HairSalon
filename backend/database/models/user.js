const mongoose = require('../mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer",
        enum: ["customer", "salon_owner", "admin"]
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const UserOwner = mongoose.model('User', UserSchema);
module.exports = UserOwner;