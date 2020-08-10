/*jshint esversion: 6 */
const { Schema } = require('mongoose');

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index:"2dsphere"
    }
});