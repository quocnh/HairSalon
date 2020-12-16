
/*jshint esversion: 6 */
const Barber = require('../models/barber.model');
const Salon = require('../models/salon.model');

var express = require('express');
var barberRouter = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/avatar/');
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

// Barber
barberRouter.get('/:barberId', (req, res) => {
    Barber.find({_id:req.params.barberId})
        .then(barbers => res.send(barbers))
        .catch((error) => console.log(error));
});

barberRouter.get('/', (req, res) => {
    Barber.find({})
        .then(barbers => res.send(barbers))
        .catch((error) => console.log(error));
});

barberRouter.post('/', upload.single('avatar'), (req, res) => {
    var strAvatarPath = "";
    if(req.file){
        console.log(req.file);
        strAvatarPath = req.file.path;
    }
    
    console.log(req.body);
    //var strBody = JSON.parse(JSON.stringify(req.body));
    
    const barber = new Barber({
        _salonId: req.body._salonId,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        profile: req.body.profile,
        avatar: strAvatarPath,

    });
    
    barber.save()
    .then(savedBarber => {
        // Update barber info into Salon DB
        Salon.findOneAndUpdate({ '_id': req.body._salonId}, 
        {
            $push: 
            { 
                _barberId: savedBarber._id
            },
        }).then()
        .catch((error) => console.log(error));
        res.send(savedBarber);
    })
    .catch((error) => console.log(error));
});

barberRouter.patch('/:barberId', upload.single('avatar'), (req, res) => {
    var strAvatarPath = "";
    var fs = require('fs');

    if(req.file){
        strAvatarPath = req.file.path;
        //delete old file avatar
        fs.exists(req.body.avatar, function(exists) {
            if(exists) {
                fs.unlink(req.body.avatar, (err) => {
                    if (err) throw err;
                    console.log(req.body.avatar + ' was deleted.');
                  });
            }
            });
    } else {
        strAvatarPath = req.body.avatar;
    }
    
    if (req.body.username) {
        
        console.log(req.body.username);
        Barber.findOneAndUpdate({ '_id': req.params.barberId}, 
            {$set: 
                { 
                    _salonId: req.body._salonId,
                    username : req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    phone: req.body.phone,
                    email: req.body.email,
                    dob: req.body.dob,
                    gender: req.body.gender,
                    profile: req.body.profile,
                    avatar: strAvatarPath,
                },
            })
            .then(barber => res.send(barber))
            .catch((error) => console.log(error));
        console.log(req.body);
    }

});

barberRouter.delete('/:barberId', (req, res) => {

    Barber.findByIdAndDelete( {'_id': req.params.barberId} )
        .then(barber => {
            console.log(barber._salonId);
            Salon.findOneAndUpdate({ '_id': barber._salonId}, 
            {
                $pull: 
                { 
                    _barberId: req.params.barberId
                },
            }).then()
            .catch((error) => console.log(error));
            res.send(barber);
        })
        .catch((error) => console.log(error));
});

barberRouter.get('/userId/:userId', (req, res) => {
    Barber.find({})
    .then(barbers => {
        for(i = 0; i < barbers.length; i++){
            if (barbers[i]._userId == req.params.userId) {
                console.log(barbers[i]);
                res.send(barbers[i]._id);
            }            
        }
    })
    .catch((error) => console.log(error));
});
module.exports = barberRouter;