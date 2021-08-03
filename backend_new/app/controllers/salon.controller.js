
/*jshint esversion: 6 */
const Salon = require('../models/salon.model');
//const Service = require('../models/salon.model');
const Barber = require('../models/barber.model');
const geocoder = require('../utils/geocoder');
const Service = require('../models/common.model');

var express = require('express');
var salonRouter = express.Router();
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/salonPhotos/');
    },
    filename: function (req, file, cb) {
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
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

salonRouter.get('/', (req, res) => {
    //console.log('Get all salons');
    Salon.find({})
        .then(salons => res.send(salons))
        .catch((error) => console.log(error));
});

// maximum 10 files upload
salonRouter.post('/', upload.array('newPhotos[]', 10), (req, res) => {
    var strPhotoPath = "";
    var strDefaultPhoto = Array(10);
    if (req.file) {
        if (req.files.length > 0) {
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
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        info: req.body.info,
        services: req.body.services,
        priceFrom: '0',
        priceTo: '0',
        ratingAverage: 4.5,
        ratingQuantity: 0,
        photos: strDefaultPhoto,
        serviceType:[],
    });

    salon.save()
        .then(newSalon => res.send(newSalon))
        .catch((error) => {
            console.log(error);
            if (error.code === 11000) {
                return res.status(400).json({ error: 'This salon already existes' });
            }
            res.status(500).json({ error: 'Server error' });
        });
});

salonRouter.delete('/:salonId', (req, res) => {
    Salon.findByIdAndDelete({ _id: req.params.salonId })
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));
});

salonRouter.get('/:salonId', (req, res) => {
    Salon.find({ _id: req.params.salonId })
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
    //console.log(req.params);
    Salon.find({
        city: req.params.city
    })
        .then(salon => {
            // console.log(salon);
            res.send(salon);
        })
        .catch((error) => console.log(error));

});

salonRouter.get('/location/:long/:lat', (req, res) => {
    //console.log(req.params);
    Salon.find({
        location:
        {
            $near:
            {
                $geometry: { type: "Point", coordinates: [Number(req.params.long), Number(req.params.lat)] },
                $maxDistance: 2000
            }
        }
    })
        .then(salon => res.send(salon))
        .catch((error) => console.log(error));

});

salonRouter.patch('/:salonId', upload.array('newPhotos[]', 10), (req, res) => {
    var fs = require('fs');
    var strPhotoPath = Array(10);
    
    //console.log(req.body);
    for (i = 0; i < strPhotoPath.length; i++) {
        if (req.body.photos[i] !== 'null') {
            strPhotoPath[i] = req.body.photos[i];
            //console.log(i + ': ' + req.body.photos[i]);
        } else {
            strPhotoPath[i] = 'null';
        }
    }

    for (i = 0; i < req.files.length; i++)
    {
        if (req.files[i].path) {
            const index = req.body.index[i];
            strPhotoPath[index] = req.files[i].path;    
            //console.log(i + ': ' + index);
            // console.log(req.body.photos[index]);

            if (req.body.photos[index] !== 'uploads/salonPhotos/default.jpg') {
                fs.exists(req.body.photos[index], function(exists) {
                    if(exists) {
                        fs.unlink(req.body.photos[index], (err) => {
                            if (err) throw err;
                            //console.log(req.body.photos[index] + ' was deleted!');
                        });
                    }
                });
            }
            
        }  
    }

    if(req.body.deletedPhotoList !== undefined){
        for (i = 0; i < strPhotoPath.length; i++) {
            if (req.body.deletedPhotoList[i] === '1') {
                // need to defind index as a const
                const index = i;
                //console.log('Xoa pphoto: ' + index);
                //console.log(req.body.photos[index]);
                strPhotoPath[index] = 'null';

                if (req.body.photos[index] !== 'uploads/salonPhotos/default.jpg') {
                    fs.exists(req.body.photos[index], function (exists) {
                        if (exists) {
                            fs.unlink(req.body.photos[index], (err) => {
                                if (err) throw err;
                                console.log(req.body.photos[index] + ' was deleted.');
                            });
                        }
                    });
                }
            }
        }
    }

    if (req.body.name) {

        // console.log(req.body.name);
        //console.log(req.body.services.name);
        //console.log(req.body.services.price);

        const fullAddress = req.body.address + ' ' + req.body.district + ' ' + req.body.city;
        //console.log(fullAddress);

        //     const longitude = loc[0].longitude;
        //     const latitude = loc[0].latitute;
        //     console.log(longitude);
        //     console.log(latitude);
        //     return location;
        // }
        

        // const loc = geocoder.geocode(fullAddress);
        //     const location = {
        //         type: 'Point',
        //         coordinates: [loc[0].longitude, loc[0].latitude],
        //         formattedAddress: loc[0].formattedAddress
        //     };
        //     // const longitude = loc[0].longitude;
        //     // const latitude = loc[0].latitute;
        // console.log(location);         
        // req.body.latitude = 37.24;
        // req.body.longitude = 127.06;
        const location = {
                    type: 'Point',
                    coordinates: [req.body.longitude, req.body.latitude],
                    formattedAddress: fullAddress
                };

        Salon.findOneAndUpdate({ '_id': req.params.salonId },
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
                    longitude: req.body.longitude,
                    latitude: req.body.latitude,
                    location: location,
                    info: req.body.info,
                    //services: [req.body.services[],
                    priceFrom: req.body.priceFrom,
                    priceTo: req.body.priceTo,
                    ratingAverage: req.body.ratingAverage,
                    ratingQuantity: req.body.ratingQuantity,
                    photos: strPhotoPath,
                    serviceType: req.body.serviceType
                },
            },
            { new: true })
            .then(salon => {
                res.send(salon);
            })
            .catch((error) => console.log(error));
    }    

});


salonRouter.patch('/:salonId/addCustomerPhotos', upload.array('customerPhotos[]', 10), (req, res) => {
    var fs = require('fs');
    var strPhotoPath = Array();

    //for (i = 0; i < req.body.customerPhotos.length; i++) {
    //    strPhotoPath.push(req.body.customerPhotos[i]);
    //}
    //console.log(req.body.customerPhotos);
    

    if (req.files[0].path) {
        strPhotoPath.push(req.files[0].path);
        //console.log(i + ': ' + index);
        // console.log(req.body.photos[index]);            
    }  

    //console.log(strPhotoPath);
    Salon.findOneAndUpdate({ '_id': req.params.salonId },
        {
            $push:
            {
                customerPhotos: strPhotoPath
            },
        },
        { new: true })
        .then(salon => {
            res.send(salon);
        })
        .catch((error) => console.log(error));

});

salonRouter.patch('/:salonId/deleteCustomerPhotos',upload.array('customerPhotos[]', 10), (req, res) => {
    var fs = require('fs');
    var strPhotoPath = req.body.customerPhoto;
    // console.log(strPhotoPath);
    ////delete old file avatar
    fs.exists(strPhotoPath, function (exists) {
        if (exists) {
            fs.unlink(strPhotoPath, (err) => {
                if (err) throw err;
                //console.log(strPhotoPath + ' was deleted.');
            });
        }
    });

    Salon.findOneAndUpdate({ '_id': req.params.salonId },
        {
            $pull:
            {
                customerPhotos: strPhotoPath
            },
        },
        { new: true })
        .then(salon => {
            res.send(salon);
        })
        .catch((error) => console.log(error));   

});



salonRouter.patch('/:salonId/addService', (req, res) => {
    

    const addedService = Object.create(Service);
    
    if (req.body.name) {
        //console.log(req.body);
        addedService.name = req.body.name;
        addedService.price = req.body.price;
        addedService.discount = req.body.discount;
        addedService.event = req.body.event;
        addedService.image = req.body.image;
        addedService.time = req.body.time;
        addedService.type = req.body.type;
        //console.log(addedService);

        Salon.findOneAndUpdate({ '_id': req.params.salonId },
            {
                $push:
                {
                    services: addedService
                },

            },
            { new: true })
            .then(salon => {
                res.send(salon);
            })
            .catch((error) => console.log(error));

    }

});

salonRouter.patch('/:salonId/delService', (req, res) => {

    const service = Object.create(Service);
    if (req.body.name) {
        //console.log(req.body);
        service.name = req.body.name;
        service.price = req.body.price;
        service.discount = req.body.discount;
        service.event = req.body.event;
        //console.log(service);
        Salon.findOneAndUpdate({ '_id': req.params.salonId },
            {
                $pull:
                {
                    services: service
                }
            },
            { new: true })
            .then(salon => res.send(salon))
            .catch((error) => console.log(error));
    }

});

salonRouter.patch('/:salonId/updateService/:sIndex', (req, res) => {

    const index = req.params.sIndex;
    const service = Object.create(Service);
    let tid = { ["services." + index]: service };
    if (req.body.name) {
        //console.log(req.body);
        service.name = req.body.name;
        service.price = req.body.price;
        service.discount = req.body.discount;
        service.event = req.body.event;
        service.image = req.body.image;
        service.time = req.body.time;
        service.type = req.body.type;
        //console.log(tid);
        Salon.findOneAndUpdate({ '_id': req.params.salonId },
            {
                $set: tid
            },
            { new: true })
            .then(salon => res.send(salon))
            .catch((error) => console.log(error));
    }

});
// Barber
salonRouter.get('/:salonId/barbers', (req, res) => {
    Barber.find({ _salonId: req.params.salonId })
        .then(barbers => res.send(barbers))
        .catch((error) => console.log(error));
});

salonRouter.post('/:salonId/barbers', upload.single('avatar'), (req, res) => {
    var strAvatarPath = "";
    if (req.file) {
        //console.log(req.file);
        strAvatarPath = req.file.path;
    }

    //console.log(req.body);
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
    Barber.findByIdAndDelete({ _salonId: req.params.salonId, _id: req.params.barberId })
        .then(barber => res.send(barber))
        .catch((error) => console.log(error));
});

module.exports = salonRouter;