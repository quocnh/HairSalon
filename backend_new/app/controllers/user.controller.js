// Controller for testing Authorization
// There are 4 functions:
// – /api/test/all for public access
// – /api/test/user for loggedin users (any role)
// – /api/test/mod for moderator users
// – /api/test/admin for admin users
const { user } = require('../models');
const db = require("../models");
const User = db.user;
const Role = db.role;
const multer = require('multer');
var express = require('express');
var userRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/avatar/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + '_' + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     // reject a file
//     if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png') || (file.mimetype === 'image/jpg')) {
//         cb(null, true);
//     } else {
//         cb(new Error('File extention is not supported ' + file.mimetype), false);
//     }
// };
// const upload = multer({
//     storage: storage, 
//     limits: {
//         fileSize: 1024*1024*5
//     },
//     fileFilter: fileFilter
// });

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.salonOwnerBoard = (req, res) => {
    res.status(200).send("Salon Owner Content.");
};

exports.distributorBoard = (req, res) => {
    res.status(200).send("Distributor Content.");
};

// exports.getUser = (req, res) => {
//     // console.log(req.params.userId);
//     User.find({ _id: req.params.userId })
//         .then(user => res.send(user))
//         .catch((error) => console.log(error));
// };

userRouter.get('/getUser/:userId', (req, res) => {
    // // console.log(req.params.userId);
    User.find({ _id: req.params.userId })
        .then(user => res.send(user))
        .catch((error) => console.log(error));
});

userRouter.get('/getAllUser', (req, res) => {
    // // console.log(req.params.userId);
    User.find({})
        .then(users => res.send(users))
        .catch((error) => console.log(error));
});

userRouter.get('/getAllCustomer', (req, res) => {
    // // console.log(req.params.userId);
    Role.find(
        {
            name: 'user'
        },
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            userRoles = roles.map(role => role._id);
            // console.log(userRoles);

            User.find({roles : [userRoles]})
            .then(users => res.send(users))
            .catch((error) => console.log(error));
        });
    
});

userRouter.delete('/deleteUser/:userId', (req, res) => {
    console.log(req.params.userId);
    User.findByIdAndDelete(req.params.userId)
        .then(user => res.send(user))
        .catch((error) => console.log(error));
});

userRouter.patch('/update/:userId', (req, res) => {
    var strAvatarPath = "";
    // var fs = require('fs');
    // console.log(req.body);
    // if(req.file){
    //     console.log(req.file.path);
    //     strAvatarPath = req.file.path;
    //     //delete old file avatar
    //     fs.exists(req.body.avatar, function(exists) {
    //         if(exists) {
    //             fs.unlink(req.body.avatar, (err) => {
    //                 if (err) throw err;
    //                 console.log(req.body.avatar + ' was deleted.');
    //               });
    //         }
    //         });
    // } else {
    //     strAvatarPath = req.body.avatar;
    // }
    // console.log(req.body);

    if (req.body.username) {
        
        console.log(req.body.username);
        User.findOneAndUpdate({ '_id': req.params.userId}, 
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
                    avatar: req.body.avatar,
                },
            },
            { new: true })
            .then(user => res.send(user))
            .catch((error) => console.log(error));
    }
});

module.exports = userRouter;