// Controller for testing Authorization
// There are 4 functions:
// – /api/test/all for public access
// – /api/test/user for loggedin users (any role)
// – /api/test/mod for moderator users
// – /api/test/admin for admin users
const User = require('../models/user.model');

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

exports.getUser = (req, res) => {
    // console.log(req.params.userId);
    User.find({ _id: req.params.userId })
        .then(user => res.send(user))
        .catch((error) => console.log(error));
};