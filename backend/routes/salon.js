
/*jshint esversion: 6 */
const Salon = require('../database/models/salon');
const Barber = require('../database/models/barber');

var express = require('express');
var salonRouter = express.Router();
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

salonRouter.get('/', (req, res) => {
    Salon.find({})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

salonRouter.post('/', (req, res) => {
    (new Salon({ 
        'name': req.body.name,
        '_salonOwnerId': req.body._salonOwnerId,
        'phone': req.body.phone,
        'email': req.body.email,
        'district': req.body.district,
        'city': req.body.city,
        'address': req.body.address,
        'local': req.body.local,
        'info': req.body.info,
        'services': req.body.services,
        'priceFrom': req.body.priceFrom,
        'priceTo': req.body.priceTo,
        'rate': req.body.rate,
        'numRate': req.body.numRate,
        'photo': req.body.photo,
    }))
    .save()
    .then(salon => res.send(salon))
    .catch((error) => console.log(error));
});



salonRouter.get('/:salonId', (req, res) => {
    Salon.find({ _id: req.params.salonId})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
        
});

// Barber
salonRouter.get('/:salonId/barbers', (req, res) => {
    Barber.find({_salonId: req.params.salonId})
        .then(barbers => res.send(barbers))
        .catch((error) => console.log(error));
});

salonRouter.post('/:salonId/barbers', upload.single('avatar'), (req, res) => {
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


salonRouter.delete('/:salonId/barbers/:barberId', (req, res) => {
    Barber.findByIdAndDelete({ _salonId: req.params.salonId, _id:req.params.barberId})
        .then(barber => res.send(barber))
        .catch((error) => console.log(error));
});

module.exports = salonRouter;