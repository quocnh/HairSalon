/*jshint esversion: 6 */
const mongoose = require('../mongoose');

const BookingSchema = new mongoose.Schema({
    _salonId: {
        type: mongoose.Types.ObjectId,
        require: [true, 'Salon id']
    },

    _customerId: {
        type: mongoose.Types.ObjectId,
        require: [true, 'Customer id']
    },

    _barberId: {
        type: mongoose.Types.ObjectId,
        require: [false, 'Barber id']
    },

    date: { 
        type: Date,
        required: [false, 'Date']
    },

    time: { 
        type: String , 
        required: [false, 'Time']
    },
    
    info: { 
        type: String , 
        required: [false, 'Detail Booking info']
    },

    status: { 
        type: String , 
        required: [false, 'status of booking (completed/processing/canceled)']
    },
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;