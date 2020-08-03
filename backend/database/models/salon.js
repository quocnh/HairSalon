/*jshint esversion: 6 */
const mongoose = require('../mongoose');

const SalonSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3
    },
    _salonOwnerId: {
        type: mongoose.Types.ObjectId,
        require: true
    }
});

const Salon = mongoose.model('Salon', SalonSchema);
module.exports = Salon;