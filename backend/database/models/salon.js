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
        lowercase: true,
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
    local: { 
        type: String , 
        required: [false, 'x,y Info ']
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
    }]
});

const Salon = mongoose.model('Salon', SalonSchema);

module.exports = Salon;
