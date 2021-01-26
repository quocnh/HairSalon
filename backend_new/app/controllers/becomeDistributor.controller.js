const config = require("../config/auth.config");
const db = require("../models");
const BecomeDistributor = db.becomeDistributor;
const User = db.user;
const Role = db.role;
const Distributor = db.distributor;

exports.createObj = (req, res) => {
    console.log("TEST1: ", req.body._userId);
    const becomeDistributor = new BecomeDistributor({
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
    becomeDistributor.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "becomeDistributor has been created successfully!" });
    });
};

exports.getAllBecomeDistributorRequest = (req,res) => {
    BecomeDistributor.find({})
        .then(becomeDistributor => res.send(becomeDistributor))
        .catch((error) => console.log(error));
};

exports.accept = (req, res) => {
    console.log("Upgrade to Distributor for ", req.body.username);

    // Add distributor role for user
    Role.find(
        {
            name: 'distributor'
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
                const distributor = new Distributor({
                    _userId: user._id,
                    // name: req.body.username,
                    // email: req.body.email,
                    // phone: req.body.phone,
                    // firstname: req.body.firstname,
                    // lastname: req.body.lastname,        
                });
                distributor.save((err, distributor) => {
                    console.log(distributor);
                });
            })
            .catch((error) => console.log(error));
        });
    
    

    // Update status of become distributor
    BecomeDistributor.findOneAndUpdate({ '_id': req.body._id}, 
    {$set: 
        { 
            status: req.body.status,
        },
    },
    {new: true})
    .then(becomeDistributor => res.send(becomeDistributor))
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
    BecomeDistributor.findOneAndUpdate({ '_id': req.body._id}, 
    {$set: 
        { 
            status: req.body.status,
        },
    },
    {new: true})
    .then(becomeDistributor => res.send(becomeDistributor))
    .catch((error) => console.log(error));
};