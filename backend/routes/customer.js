
/*jshint esversion: 6 */
const Customer = require('../database/models/customer');

var express = require('express');
var customerRouter = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/customerAvatar/'});

// Customer
customerRouter.get('/', (req, res) => {
    Customer.find({})
        .then(customers => res.send(customers))
        .catch((error) => console.log(error));
});

customerRouter.post('/', upload.single('avatar'), (req, res) => {
    var strAvatarPath = "";
    if(req.file){
        console.log(req.file);
        strAvatarPath = req.file.path;
    }
    
    console.log(req.body);
    console.log(req.body.username);
    //var strBody = JSON.parse(JSON.stringify(req.body));
    
    const customer = new Customer({
        username : req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        city: req.body.city,
        district: req.body.district,
        address: req.body.address,
        avatar: strAvatarPath,

    });
    
    customer.save()
    .then(savedCustomer => res.send(savedCustomer))
    .catch((error) => console.log(error));
});

customerRouter.get('/:customerId', (req, res) => {
    Customer.find({ _id: req.params.customerId})
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
        
});

customerRouter.patch('/:customerId', upload.single('avatar'), (req, res) => {
    var strAvatarPath = "";
    if(req.file){
        console.log(req.file);
        strAvatarPath = req.file.path;
    }
    else
    {
        strAvatarPath = req.body.avatar;
    }
    if (req.body.username) {
        console.log(req.body);
        console.log(req.body.username);
        Customer.findOneAndUpdate({ '_id': req.params.customerId}, 
            {$set: 
                {   
                    username : req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    email: req.body.email,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    city: req.body.city,
                    district: req.body.district,
                    address: req.body.address,
                    avatar: strAvatarPath,
                }
            })
            .then(customer => res.send(customer))
            .catch((error) => console.log(error));
    }
});

customerRouter.delete('/:customerId', (req, res) => {
    Customer.findByIdAndDelete(req.params.customerId)
        .then(customer => res.send(customer))
        .catch((error) => console.log(error));
});

module.exports = customerRouter;