
/*jshint esversion: 6 */
const Salon = require('../database/models/salon');

var express = require('express');
var salonRouter = express.Router();

salonRouter.get('/', (req, res) => {
    Salon.find({})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

module.exports = salonRouter;