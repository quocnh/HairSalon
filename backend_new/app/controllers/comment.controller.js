
/*jshint esversion: 6 */
const Comment = require('../models/comment.model');

var express = require('express');
var commentRouter = express.Router();
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/commentPhotos/');
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

commentRouter.get('/salon/:salonId', (req, res) => {
    Comment.find({'salonId': req.params.salonId})
        .then(comments => res.send(comments))
        .catch((error) => console.log(error));
});

commentRouter.get('/user/:userId', (req, res) => {
    Comment.find({'userId': req.params.userId})
        .then(comments => res.send(comments))
        .catch((error) => console.log(error));
});

// maximum 10 files upload
commentRouter.post('/', upload.array('newPhotos[]', 10), (req, res) => {
    var strPhotoPath = "";
    var strDefaultPhoto = Array();

    if (req.files != null) {
        for (var i = 0; i < req.files.length; i++) {
            // console.log(req.files);
            strPhotoPath.push(req.files[i].path);
        }
    }

    //console.log(req.body);
    const comment = new Comment({
        userId: req.body.userId,
        salonId: req.body.salonId,
        content: req.body.content,
        rating: req.body.rating,
        photos: strDefaultPhoto,
    });

    comment.save()
        .then(newComment => {
            res.send(newComment);
        })
        .catch((error) => {
            console.log(error);            
            res.status(500).json({ error: 'Server error' });
        });
});


// commentRouter.patch('/:salonId', upload.array('newPhotos[]', 10), (req, res) => {
//     var fs = require('fs');
//     var strPhotoPath = Array(10);

//     for (i = 0; i < strPhotoPath.length; i++) {
//         if (req.body.photos[i] !== 'null') {
//             strPhotoPath[i] = req.body.photos[i];
//             //console.log(i + ': ' + req.body.photos[i]);
//         } else {
//             strPhotoPath[i] = 'null';
//         }
//     }

//     for (i = 0; i < req.files.length; i++)
//     {
//         if (req.files[i].path) {
//             const index = req.body.index[i];
//             strPhotoPath[index] = req.files[i].path;    
//             //console.log(i + ': ' + index);
//             // console.log(req.body.photos[index]);

//             ////delete old file avatar
//             if (req.body.photos[index] !== 'uploads/salonPhotos/default.jpg') {
//                 fs.exists(req.body.photos[index], function(exists) {
//                     if(exists) {
//                         fs.unlink(req.body.photos[index], (err) => {
//                             if (err) throw err;
//                             console.log(req.body.photos[index] + ' was deleted.');
//                         });
//                     }
//                 });
//             }
            
//         }  
//     }


//     // console.log(req.body.deletedPhotoList);
//     for (i = 0; i < strPhotoPath.length; i++) {
//         if (req.body.deletedPhotoList[i] === '1') {
//             // need to defind index as a const
//             const index = i;
//             //console.log('Xoa pphoto: ' + index);
//             //console.log(req.body.photos[index]);
//             strPhotoPath[index] = 'null';

//             ////delete old file avatar
//             fs.exists(req.body.photos[index], function (exists) {
//                 if (exists) {
//                     fs.unlink(req.body.photos[index], (err) => {
//                         if (err) throw err;
//                         console.log(req.body.photos[index] + ' was deleted.');
//                     });
//                 }
//             });
//         }
//     }

//     // console.log(req.body);

//     if (req.body.name) {

//         // console.log(req.body.name);
//         //console.log(req.body.services.name);
//         //console.log(req.body.services.price);

//         const fullAddress = req.body.address + ' ' + req.body.district + ' ' + req.body.city;
//         console.log(fullAddress);

//         //     const longitude = loc[0].longitude;
//         //     const latitude = loc[0].latitute;
//         //     console.log(longitude);
//         //     console.log(latitude);
//         //     return location;
//         // }
        

//         // const loc = geocoder.geocode(fullAddress);
//         //     const location = {
//         //         type: 'Point',
//         //         coordinates: [loc[0].longitude, loc[0].latitude],
//         //         formattedAddress: loc[0].formattedAddress
//         //     };
//         //     // const longitude = loc[0].longitude;
//         //     // const latitude = loc[0].latitute;
//         // console.log(location);         
//         // req.body.latitude = 37.24;
//         // req.body.longitude = 127.06;
//         const location = {
//                     type: 'Point',
//                     coordinates: [req.body.longitude, req.body.latitude],
//                     formattedAddress: fullAddress
//                 };

//         Salon.findOneAndUpdate({ '_id': req.params.salonId },
//             {
//                 $set:
//                 {
//                     name: req.body.name,
//                     _salonOwnerId: req.body._salonOwnerId,
//                     phone: req.body.phone,
//                     email: req.body.email,
//                     district: req.body.district,
//                     city: req.body.city,
//                     address: req.body.address,
//                     longitude: req.body.longitude,
//                     latitude: req.body.latitude,
//                     location: location,
//                     info: req.body.info,
//                     //services: [req.body.services[],
//                     priceFrom: req.body.priceFrom,
//                     priceTo: req.body.priceTo,
//                     rate: req.body.rate,
//                     numRate: req.body.numRate,
//                     photos: strPhotoPath
//                 },
//             },
//             { new: true })
//             .then(salon => {
//                 // salon.update();
//                 res.send(salon);
//             })
//             .catch((error) => console.log(error));
//     }    

// });

module.exports = commentRouter;