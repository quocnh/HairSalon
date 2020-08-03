/*jshint esversion: 6 */
const mongoose = require('../mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3
    }
});

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;