
/*jshint esversion: 6 */
const Barber = require('../database/models/barber');

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
        _salonId: req.params.salonId,
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
    .then(savedBarber => res.send(savedBarber))
    .catch((error) => console.log(error));
});


barberRouter.delete('/:barberId', (req, res) => {
    Barber.findByIdAndDelete({_id:req.params.barberId})
        .then(barber => res.send(barber))
        .catch((error) => console.log(error));
});

module.exports = barberRouter;