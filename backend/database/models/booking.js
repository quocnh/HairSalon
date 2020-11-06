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

    createdDate: { 
        type: Date,
        required: [false, 'Date']
    },

    bookingDate: { 
        type: Date,
        required: [false, 'Date']
    },

    bookingTime: { 
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

// get the current timestamp for the booking
BookingSchema.pre('save', async function(next) {

    this.createdDate = new Date().getTime();
    console.log('timestamp: ' + this.createdDate);
    next();
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;