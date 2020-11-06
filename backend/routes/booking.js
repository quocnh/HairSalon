
/*jshint esversion: 6 */
const Barber = require('../database/models/barber');
const Customer = require('../database/models/customer');
const Salon = require('../database/models/salon');
const Booking = require('../database/models/booking');

var express = require('express');
var bookingRouter = express.Router();

// Booking
bookingRouter.get('/', (req, res) => {
    Booking.find({})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

// Get all booking from barber
bookingRouter.get('/barber/:barberId', (req, res) => {
    Barber.find({_barberId:req.params.barberId})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

// Get all booking from customer
bookingRouter.get('/customer/:customerId', (req, res) => {
    Barber.find({_customerId:req.params.customerId})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

// Get all booking from salon
bookingRouter.get('/salon/:salonId', (req, res) => {
    Barber.find({_salonId:req.params.salonId})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

bookingRouter.post('/', (req, res) => {
    
    console.log(req.body);
    //var strBody = JSON.parse(JSON.stringify(req.body));
    
    const booking = new Booking({
        _salonId: req.body._salonId,
        _barberId: req.body._barberId,
        _customerId: req.body._customerId,
        bookingDate: req.body.date,
        bookingTime: req.body.time,
        info: req.body.info,
        status: req.body.status,
    });
    
    booking.save()
    .then(savedBooking => res.send(savedBooking))
    .catch((error) => console.log(error));
});

bookingRouter.patch('/:bookingId', (req, res) => {

    if (req.body.bookingId) {
        
        console.log(req.body.bookingId);
        Booking.findOneAndUpdate({ '_id': req.params.bookingId}, 
            {$set: 
                { 
                    _salonId: req.body._salonId,
                    _barberId: req.body._barberId,
                    _customerId: req.body._customerId,
                    bookingDate: req.body.date,
                    bookingTime: req.body.time,
                    info: req.body.info,
                    status: req.body.status,
                },
            },
            {new: true})
            .then(booking => res.send(booking))
            .catch((error) => console.log(error));

        console.log(req.body);
    }

});

bookingRouter.delete('/:bookingId', (req, res) => {
    Booking.findByIdAndDelete({_id:req.params.bookingId})
        .then(booking => res.send(booking))
        .catch((error) => console.log(error));
});

module.exports = bookingRouter;