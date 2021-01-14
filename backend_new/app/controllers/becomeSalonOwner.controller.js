const config = require("../config/auth.config");
const db = require("../models");
const BecomeSalonOwner = db.becomeSalonOwner;

exports.createObj = (req, res) => {
    console.log("TEST1: ", req.body._userId);
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