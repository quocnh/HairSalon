/*jshint esversion: 6 */
const mongoose = require('mongoose');

const DistributorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 3
    }
});

const Distributor = mongoose.model('Distributor', DistributorSchema);
module.exports = Distributor;