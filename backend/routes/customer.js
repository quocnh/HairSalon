
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
    var strBody = JSON.parse(JSON.stringify(req.body));
    const customer = new Customer({
        username : strBody.customer.username,
        firstname: strBody.customer.firstname,
        lastname: strBody.customer.lastname,
        phone: strBody.customer.phone,
        email: strBody.customer.email,
        dob: strBody.customer.dob,
        gender: strBody.customer.gender,
        city: strBody.customer.city,
        district: strBody.customer.district,
        address: strBody.customer.address

    });
    
    // console.log('LARRY ~~~ ' + customer);
    customer.save()
    .then(savedCustomer => res.send(savedCustomer))
    .catch((error) => console.log(error));
});

customerRouter.get('/:customerId', (req, res) => {
    Customer.find({ _id: req.params.customerId})
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
        
});

customerRouter.patch('/:customerId', (req, res) => {
    var strBody = JSON.parse(JSON.stringify(req.body));
    Customer.findOneAndUpdate({ '_id': req.params.customerId}, 
        {$set: 
            {   username : strBody.customer.username,
                firstname: strBody.customer.firstname,
                lastname: strBody.customer.lastname,
                phone: strBody.customer.phone,
                email: strBody.customer.email,
                dob: strBody.customer.dob,
                gender: strBody.customer.gender,
                city: strBody.customer.city,
                district: strBody.customer.district,
                address: strBody.customer.address}
        })
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
});

customerRouter.delete('/:customerId', (req, res) => {
    Customer.findByIdAndDelete(req.params.customerId)
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
});

module.exports = customerRouter;