
/*jshint esversion: 6 */
//const Barber = require('../models/barber.model');
//const Customer = require('../models/customer.model');
//const Salon = require('../models/salon.model');
const Booking = require('../models/booking.model');

var express = require('express');
var bookingRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/avatar/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png') || (file.mimetype === 'image/jpg')) {
        cb(null, true);
    } else {
        cb(new Error('File extention is not supported ' + file.mimetype), false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

// Booking
bookingRouter.get('/', (req, res) => {
    Booking.find({})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

// Get all booking from barber
bookingRouter.get('/barber/:barberId', (req, res) => {
    Booking.find({_barberId:req.params.barberId})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

// Get all booking from customer
bookingRouter.get('/customer/:customerId', (req, res) => {
    Booking.find({_customerId:req.params.customerId})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

// Get all booking from salon
bookingRouter.get('/salon/:salonId', (req, res) => {
    console.log(req.params.salonId);
    Booking.find({_salonId:req.params.salonId})
        .then(bookings => res.send(bookings))
        .catch((error) => console.log(error));
});

bookingRouter.post('/',upload.single('booking'), (req, res) => {
    
    const booking = new Booking({
        _salonId: req.body._salonId,
        _barberId: req.body._barberId,
        _userId: req.body._userId,
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
                    _userId: req.body._userId,
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