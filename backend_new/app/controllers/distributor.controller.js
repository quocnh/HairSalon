
/*jshint esversion: 6 */
const Distributor = require('../models/distributor.model');

var express = require('express');
var distributorRouter = express.Router();
const multer = require('multer');
const BecomeDistributor = require('../models/becomeDistributor.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/salonPhotos/');
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
// Distributor
distributorRouter.get('/', (req, res) => {
    Distributor.find({})
        .then(distributors => res.send(distributors))
        .catch((error) => console.log(error));
});

distributorRouter.post('/', (req, res) => {
    (new Distributor({ 
        'name': req.body.name
    }))
    .save()
    .then(distributors => res.send(distributors))
    .catch((error) => console.log(error));
});

distributorRouter.get('/:distributorId', (req, res) => {
    Distributor.find({ '_id': req.params.distributorId})
        .then(distributor => res.send(distributor))
        .catch((error) => console.log(error));
});

distributorRouter.patch('/:distributorId', upload.single('avatar'), (req, res) => {
    console.log(req.params.distributorId);
    Distributor.findOneAndUpdate({ _id: req.params.distributorId}, 
    {
        $set: 
        { 
            name: req.body.name,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            district: req.body.district,
            city: req.body.city,
            address: req.body.address,
            phone: req.body.phone,            
        },
    },
    {new: true})
    .then(distributor => res.send(distributor))
    .catch((error) => console.log(error));
});

distributorRouter.delete('/:distributorId', (req, res) => {
    Distributor.findByIdAndDelete(req.params.distributorId)
        .then(distributor => res.send(distributor))
        .catch((error) => console.log(error));
});

distributorRouter.delete('/userId/:userId', (req, res) => {
    // Remove role distributor
    Role.find(
        {
            name: 'user'
        },
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log(roles);
            const newRole = roles.map((role) => role._id);

            User.findOneAndUpdate({ '_id': req.params.userId}, 
            {$set: 
                { 
                    roles: newRole,
                },
            })
            .then()
            .catch((error) => console.log(error));
        });

    //Delete data in BecomDistributor
    BecomeDistributor.find({'_userId': req.params.userId})
    .then(becomeDistributors => {
        console.log(becomeDistributors[0]._id);
        BecomeDistributor.findByIdAndDelete(becomeDistributors[0]._id)
        .then()
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));

    //Delete distributor
    //console.log(req.params.userId);
    Distributor.find({'_userId': req.params.userId})
        .then(distributors => {
            console.log(distributors[0]._id);
            Distributor.findByIdAndDelete(distributors[0]._id)
            .then(distributor => res.send(distributor))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    
});

distributorRouter.get('/userId/:userId', (req, res) => {
    // Distributor.find({})
    // .then(distributors => {
    //     for(i = 0; i < distributors.length; i++){
    //         if (distributors[i]._userId == req.params.userId) {
    //             console.log(distributors[i]);
    //             res.send(distributors[i]._id);
    //             return;
    //         }            
    //     }
    // })
    // .catch((error) => console.log(error));

    //TODO: find the reason why the below code is not working
    
    console.log(req.params.userId);
    Distributor.find({ _userId: req.params.userId})
        .then(distributors => {
            res.send(distributors[0]._id);            
        })
        .catch((error) => console.log(error));
    
});


module.exports = distributorRouter;