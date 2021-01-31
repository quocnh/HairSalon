
/*jshint esversion: 6 */
const SalonOwner = require('../models/salonOwner.model');
const Salon = require('../models/salon.model');
const Role = require('../models/role.model');
const User = require('../models/user.model');

var express = require('express');
var salonOwnerRouter = express.Router();
const multer = require('multer');
const { default: consolaGlobalInstance } = require('consola');
const BecomeSalonOwner = require('../models/becomeSalonOwner.model');

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

salonOwnerRouter.get('/', (req, res) => {
    SalonOwner.find({})
        .then(salonOwners => res.send(salonOwners))
        .catch((error) => console.log(error));
});

salonOwnerRouter.post('/', (req, res) => {
    (new SalonOwner({ 'name': req.body.name}))
    .save()
    .then(salonOwners => res.send(salonOwners))
    .catch((error) => console.log(error));
});

salonOwnerRouter.get('/:salonOwnerId', (req, res) => {
    SalonOwner.find({ _id: req.params.salonOwnerId})
        .then(salonOwner => res.send(salonOwner))
        .catch((error) => console.log(error));
});

salonOwnerRouter.patch('/:salonOwnerId', upload.single('avatar'), (req, res) => {
    console.log(req.params.salonOwnerId);
    SalonOwner.findOneAndUpdate({ _id: req.params.salonOwnerId}, 
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
    .then(salonOwner => res.send(salonOwner))
    .catch((error) => console.log(error));
});

// salonOwnerRouter.delete('/:salonOwnerId', (req, res) => {
//     SalonOwner.findByIdAndDelete(req.params.salonOwnerId)
//         .then(salonOwner => res.send(salonOwner))
//         .catch((error) => console.log(error));
// });

salonOwnerRouter.delete('/userId/:userId', (req, res) => {
    // Remove role salon owner
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

    //Delete data in Becomsalon owner
    BecomeSalonOwner.find({'_userId': req.params.userId})
    .then(becomeSalonOwners => {
        console.log(becomeSalonOwners[0]._id);
        BecomeSalonOwner.findByIdAndDelete(becomeSalonOwners[0]._id)
        .then()
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));

    //Delete salon owner
    //console.log(req.params.userId);
    SalonOwner.find({'_userId': req.params.userId})
        .then(salonOwners => {
            console.log(salonOwners[0]._id);
            SalonOwner.findByIdAndDelete(salonOwners[0]._id)
            .then(salonOwner => res.send(salonOwner))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    
});

salonOwnerRouter.get('/:salonOwnerId/salons', (req, res) => {
    Salon.find({_salonOwnerId: req.params.salonOwnerId})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

salonOwnerRouter.get('/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.find({_salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

salonOwnerRouter.patch('/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.findOneAndUpdate({ _salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId}, {$set: req.body})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

salonOwnerRouter.delete('/:salonOwnerId/salons/:salonId', (req, res) => {
    Salon.findByIdAndDelete({ _salonOwnerId: req.params.salonOwnerId, _id:req.params.salonId})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

salonOwnerRouter.get('/userId/:userId', (req, res) => {
    
    // SalonOwner.find({})
    // .then(salonOwners => {
    //     for(i = 0; i < salonOwners.length; i++){
    //         if (salonOwners[i]._userId == req.params.userId) {
    //             console.log(salonOwners[i]);
    //             res.send(salonOwners[i]._id);
    //         }            
    //     }
    // })
    // .catch((error) => console.log(error));

    //TODO: find the reason why the below code is not working
   
    console.log(req.params.userId);
    SalonOwner.find({ _userId: req.params.userId})
        .then(salonOwners => {
            // console.log("LARRY: " + salonOwner);
            res.send(salonOwner[0]._id);            
        })
        .catch((error) => console.log(error));
    
});

module.exports = salonOwnerRouter;