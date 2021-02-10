/*jshint esversion: 6 */
const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const SalonSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxlength: [50, 'salon name must be less than 50 chars']
    },
    _salonOwnerId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    _barberId: [{
        type: mongoose.Types.ObjectId,
        require: false
    }],
    phone: {
        type: Number,
        required: [false, 'Phone number']
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
        required: [true, 'address must be filled']
    },
    longitude: {
        type: String,
        required: [false, 'longitude']
    },
    latitude: {
        type: String, 
        required: [false, 'latitude']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            require: false,
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createAt: {
        type: Date,
        defaule: Date.now
    },
    info: { 
        type: String , 
        required: [false, 'Salon short Info ']
    },
    services: [{ 
        type: Object , 
        required: [false, 'services Info ']
    }],
    priceFrom: { 
        type: Number, 
        required: [false, 'Price from Info ']
    },
    priceTo: { 
        type: Number, 
        required: [false, 'PRice to Info ']
    },
    rate: { 
        type: Number, 
        required: [false, 'Salon Info ']
    },
    numRate: { 
        type: Number, 
        required: [false, 'Salon Info ']
    },
    photos: [{
        type: String,
        require: [false, 'salon images']
    }],
    customerPhotos: [{
        type: String,
        require: [false, 'customer Photos']
    }]
});

// Geocoder & create location
// SalonSchema.pre('save', async function(next) {
//     fullAddress = this.address + ' ' + this.district + ' ' + this.city;
//     const loc = await geocoder.geocode(fullAddress);
//     console.log(loc);
//     this.location = {
//         type: 'Point',
//         coordinates: [loc[0].longitude, loc[0].latitude],
//         formattedAddress: loc[0].formattedAddress
//     };
//     this.latitude = loc[0].latitude;
//     this.longitude = loc[0].longitude;
//     // Do not save address
//     next();
// });

const Salon = mongoose.model('Salon', SalonSchema);

module.exports = Salon;
