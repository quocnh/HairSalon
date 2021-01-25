const config = require("../config/auth.config");
const db = require("../models");
const BecomeSalonOwner = db.becomeSalonOwner;
const User = db.user;
const Role = db.role;
const SalonOwner = db.salonOwner;

exports.createObj = (req, res) => {
    console.log("TEST1: ", req.body);
    const becomeSalonOwner = new BecomeSalonOwner({
        _userId: req.body._userId,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        city: req.body.city,
        phone: req.body.phone,
        district: req.body.district,
        address: req.body.address,
        status: req.body.status,

    });
    becomeSalonOwner.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "BecomeSalonOwner has been created successfully!" });
    });
};

exports.getAllBecomeSalonOwnerRequest = (req,res) => {
    BecomeSalonOwner.find({})
        .then(becomeSalonOwner => res.send(becomeSalonOwner))
        .catch((error) => console.log(error));
};

exports.accept = (req, res) => {
    console.log("Upgrade to salonOwner for ", req.body.username);

    // Add salon owner role for user
    Role.find(
        {
            name: 'salon_owner'
        },
        (err, roles) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            console.log(roles);
            const newRole = roles.map((role) => role._id);
            console.log(req.body.username);

            User.findOneAndUpdate({ 'username': req.body.username}, 
            {$set: 
                { 
                    roles: newRole,
                },
            },
            {new: true})
            .then(user => {
                console.log(user.role);
                // Create salon owner DB
                const salonOwner = new SalonOwner({
                    _userId: user._id,
                    name: req.body.username,
                    email: req.body.email,
                    phone: req.body.phone,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,        
                });
                salonOwner.save((err, salonOwner) => {
                    console.log(salonOwner);
                });
            })
            .catch((error) => console.log(error));
        });
    
    

    // Update status of become Salon onwer
    BecomeSalonOwner.findOneAndUpdate({ '_id': req.body._id}, 
    {$set: 
        { 
            status: req.body.status,
        },
    },
    {new: true})
    .then(becomeSalonOwner => res.send(becomeSalonOwner))
    .catch((error) => console.log(error));
};

exports.reject = (req, res) => {
    console.log("TEST1: ", req.body._id);
    // change role to customer
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
            console.log(req.body.username);

            User.findOneAndUpdate({ 'username': req.body.username}, 
            {$set: 
                { 
                    roles: newRole,
                },
            },
            {new: true})
            .then(user => console.log(user.role))
            .catch((error) => console.log(error));
        });
    
    // Delete salon owner DB
    // No need

    // Update status of become Salon onwer
    BecomeSalonOwner.findOneAndUpdate({ '_id': req.body._id}, 
    {$set: 
        { 
            status: req.body.status,
        },
    },
    {new: true})
    .then(becomeSalonOwner => res.send(becomeSalonOwner))
    .catch((error) => console.log(error));
};