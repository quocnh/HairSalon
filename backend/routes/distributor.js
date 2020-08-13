
/*jshint esversion: 6 */
const Distributor = require('../database/models/distributor');

var express = require('express');
var distributorRouter = express.Router();

// Distributor
distributorRouter.get('/', (req, res) => {
    Distributor.find({})
        .then(distributors => res.send(distributors))
        .catch((error) => console.log(error));
});

distributorRouter.post('/', (req, res) => {
    (new Distributor({ 'name': req.body.name}))
    .save()
    .then(distributors => res.send(distributors))
    .catch((error) => console.log(error));
});

distributorRouter.get('/:distributorId', (req, res) => {
    Distributor.find({ _id: req.params.distributorId})
        .then(distributor => res.send(distributor))
        .catch((error) => console.log(error));
});

distributorRouter.patch('/:distributorId', (req, res) => {
    Distributor.findOneAndUpdate({ '_id': req.params.distributorId}, {$set: req.body})
        .then(distributor => res.send(distributor))
        .catch((error) => console.log(error));
});

distributorRouter.delete('/:distributorId', (req, res) => {
    Distributor.findByIdAndDelete(req.params.distributorId)
        .then(distributor => res.send(distributor))
        .catch((error) => console.log(error));
});


module.exports = distributorRouter;