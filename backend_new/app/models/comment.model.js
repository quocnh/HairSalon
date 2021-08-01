/*jshint esversion: 6 */
const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const CommentSchema = new mongoose.Schema({

    salonId: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        require: true
    },

    createdDate: { 
        type: Date,
        required: [false, 'Date']
    },
    
    content: { 
        type: String , 
        required: [true, 'Salon short Info ']
    },

    rating: { 
        type: Number , 
        default: 4.5, 
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    
    photos: [{
        type: String,
        require: [false, 'customer images']
    }],
});

CommentSchema.pre('save', async function(next) {

    this.createdDate = new Date().getTime();
    // console.log('timestamp: ' + this.createdDate);
    next();
});
const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
