const config = require("../config/auth.config");
const db = require("../models");
const BecomeSalonOwner = db.becomeSalonOwner;

exports.createObj = (req, res) => {
    console.log("TEST1: ", req.body._userId);
    const becomeSalonOwner = new BecomeSalonOwner({
        _userId: req.body._userId,
        username: req.body.username,
        // firstname: req.body.firstname,
        // lastname: req.body.lastname,
        // email: req.body.email,
        // city: req.body.city,
        // phone: req.body.phone,
        // district: req.body.district,
        // status: req.body.status,

    });
    becomeSalonOwner.save(err => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "BecomeSalonOwner has been created successfully!" });
    });
    // res.status(200).send("XXXXXXX");
};

exports.getAllBecomeSalonOwnerRequest = (req,res) => {
    // get all from db here - TODO
    res.status(200).send("XXXXXXX");
};