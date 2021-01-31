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
