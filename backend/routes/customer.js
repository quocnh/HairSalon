
/*jshint esversion: 6 */
const Customer = require('../database/models/customer');

var express = require('express');
var customerRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/customerAvatar/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png') || (file.mimetype === 'image/jpg')) {
        cb(null, true);
    } else {
        cb(new Error('File extention is not supported ' + file.mimetype), false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

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
        strAvatarPath = req.file.path;
    } else {
        strAvatarPath = req.body.avatar;
    }
    console.log('File upload: ' + req.file);
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