
/*jshint esversion: 6 */
const Salon = require('../models/salon.model');
//const Service = require('../models/salon.model');
const Barber = require('../models/barber.model');

var express = require('express');
var salonRouter = express.Router();
const multer = require('multer');

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

salonRouter.get('/', (req, res) => {
    Salon.find({})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

// maximum 10 files upload
salonRouter.post('/', upload.array('newPhotos[]', 10), (req, res) => {
    var strPhotoPath = "";
    var strDefaultPhoto = Array(10);
    if (req.file) {
        if(req.files.length > 0){
            // console.log(req.files);
            strPhotoPath = req.file.path;
        }
    }
    
    // console.log(req.body);
    for (i = 0; i < strDefaultPhoto.length; i++) {
        strDefaultPhoto[i] = "uploads/salonPhotos/default.jpg";
    }
    
    const salon = new Salon({ 
        name: req.body.name,
        _salonOwnerId: req.body._salonOwnerId,
        phone: req.body.phone,
        email: req.body.email,
        district: req.body.district,
        city: req.body.city,
        address: req.body.address,
        //longitude: req.body.longitude,
        //latitude: req.body.latitude,
        info: req.body.info,
        services: req.body.services,
        priceFrom: '0',
        priceTo: '0',
        rate: '0',
        numRate: '0',
        photos: strDefaultPhoto,
    });
    
    salon.save()
    .then(newSalon => res.send(newSalon))
    .catch((error) => {
        console.log(error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'This salon already existes'});
        }
        res.status(500).json({ error: 'Server error'});
    });
});

salonRouter.delete('/:salonId', (req, res) => {
    Salon.findByIdAndDelete({_id:req.params.salonId})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

salonRouter.get('/:salonId', (req, res) => {
    Salon.find({ _id: req.params.salonId})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
        
});

salonRouter.get('/city_district/:city/:district', (req, res) => {

    Salon.find({ 
        city: req.params.city,
        district: req.params.district
    })
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
        
});

salonRouter.get('/city/:city', (req, res) => {
    Salon.find({ 
        city: req.params.city
    })
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
        
});

salonRouter.patch('/:salonId', upload.array('newPhotos[]', 10), (req, res) => {
    if(req.files.length > 0){
        var strPhotoPath = Array(10);
        // update photos
        // console.log(req.files.length);
        // console.log(req.body);
        for (i = 0; i < strPhotoPath.length; i++){
            strPhotoPath[i] = req.body.photos[i];
        } 
        // console.log(strPhotoPath);

        for (i = 0; i < req.files.length; i++)
        {
            if (req.files[i].path) {
                strPhotoPath[req.body.index[i]] = req.files[i].path;    
                // console.log(i + ': ' + strPhotoPath[req.body.index[i]]);
            }  
        }

        Salon.findOneAndUpdate({ '_id': req.params.salonId}, 
        {
            $set: 
            { 
                photos: strPhotoPath
            },
        },
        {new: true})
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
        
    }
    else {
        console.log(req.body);
    
        if (req.body.name) {
            
            console.log(req.body.name);
            console.log(req.body.services.name);
            console.log(req.body.services.price);
            Salon.findOneAndUpdate({ '_id': req.params.salonId}, 
                {
                    $set: 
                    { 
                        name: req.body.name,
                        _salonOwnerId: req.body._salonOwnerId,
                        phone: req.body.phone,
                        email: req.body.email,
                        district: req.body.district,
                        city: req.body.city,
                        address: req.body.address,
                        //longitude: req.body.longitude,
                        //latitude: req.body.latitude,
                        info: req.body.info,
                        //services: [req.body.services[],
                        priceFrom: req.body.priceFrom,
                        priceTo: req.body.priceTo,
                        rate: req.body.rate,
                        numRate: req.body.numRate,
                    },
                },
                {new: true})
                .then(salon => res.send(salon))
                .catch((error) => console.log(error));
        }
    }

});

salonRouter.patch('/:salonId/addService', (req, res) => {
    const Service = {
        name: String,
        price: Number
    };

    const addedService = Object.create(Service);
    if (req.body.name) {
        //console.log(req.body);
        addedService.name = req.body.name;
        addedService.price = req.body.price;
        //console.log(addedService);
        
        Salon.findOneAndUpdate({ '_id': req.params.salonId}, 
            {
                $push:
                {
                    services: addedService
                },

            },
            {new: true})
            .then(salon => {
                res.send(salon);
            })
            .catch((error) => console.log(error));

    }

});

salonRouter.patch('/:salonId/delService', (req, res) => {
    const Service = {
        name: String,
        price: Number
    };
    const service = Object.create(Service);
    if (req.body.name) {
        //console.log(req.body);
        service.name = req.body.name;
        service.price = req.body.price;
        console.log(service);
        Salon.findOneAndUpdate({ '_id': req.params.salonId}, 
            {
                $pull: 
                {
                    services: service
                }
            },
            {new: true})
            .then(salon => res.send(salon))
            .catch((error) => console.log(error));
    }

});

salonRouter.patch('/:salonId/updateService/:sIndex', (req, res) => {
    const Service = {
        name: String,
        price: Number
    };
    const index = req.params.sIndex;
    const service = Object.create(Service);
    let tid = {["services." + index] : service};
    if (req.body.name) {
        //console.log(req.body);
        service.name = req.body.name;
        service.price = req.body.price;
        console.log(tid);
        Salon.findOneAndUpdate({ '_id': req.params.salonId}, 
            {
                $set: tid
            },
            {new: true})
            .then(salon => res.send(salon))
            .catch((error) => console.log(error));
    }

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