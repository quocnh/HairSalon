/*jshint esversion: 6 */
const mongoose = require('../mongoose');

const SalonOwnerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3
    },
    _salonId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
});

const SalonOwner = mongoose.model('SalonOwner', SalonOwnerSchema);
module.exports = SalonOwner;