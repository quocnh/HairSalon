/*jshint esversion: 6 */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/salondbmanager', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Database connected."))
    .catch((error) => console.log("Can't connect mongodb !!!"));

module.exports = mongoose;