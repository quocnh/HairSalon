
/*jshint esversion: 6 */
const Customer = require('../database/models/customer');

var express = require('express');
var customerRouter = express.Router();

// Customer
customerRouter.get('/', (req, res) => {
    Customer.find({})
        .then(customers => res.send(customers))
        .catch((error) => console.log(error));
});

customerRouter.post('/', (req, res) => {
    (new Customer({ 'name': req.body.name}))
    .save()
    .then(customers => res.send(customers))
    .catch((error) => console.log(error));
});

customerRouter.get('/:customerId', (req, res) => {
    Customer.find({ _id: req.params.customerId})
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
});

customerRouter.patch('/:customerId', (req, res) => {
    Customer.findOneAndUpdate({ '_id': req.params.customerId}, {$set: req.body})
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
});

customerRouter.delete('/:customerId', (req, res) => {
    Customer.findByIdAndDelete(req.params.customerId)
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
});

module.exports = customerRouter;