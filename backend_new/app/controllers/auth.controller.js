// There are 2 main functions for Authentication:
// - signup: create new User in database (role is user if not specifying role)
// - signin:

// find username of the request in database, if it exists
// compare password with password in database using bcrypt, if it is correct
// generate a token using jsonwebtoken
// return user information & access Token

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Customer = db.customer;
const SalonOwner = db.salonOwner;
const Distributor = db.distributor;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const customer = new Customer({
        username: req.body.username,
        email: req.body.email,
        // password: bcrypt.hashSync(req.body.password, 8)
    });

    const salonOwner = new SalonOwner({
        name: req.body.username,
        email: req.body.email,
        // password: bcrypt.hashSync(req.body.password, 8)
    });

    const distributor = new Distributor({
        name: req.body.username,
        email: req.body.email,
        // password: bcrypt.hashSync(req.body.password, 8)
    });


    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        // API creates specific roles 
        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map(role => role._id);

                    user.save(err => {
                
                        if (req.body.roles.includes("salon_owner")) {
                            // create a customer with recently created userId
                            console.log("XXX created a salon owner: ", req.body.roles.includes("salon_owner"));

                            User.findOne({ username: { $in: req.body.username } }, (err, userObject) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }
                                console.log("XXX Created UserId: ", [userObject._id]);
                                salonOwner._userId = [userObject._id];
                                salonOwner.save(err => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }

                                    res.send({ message: "Customer was registered successfully!" });
                                });
                            });

                        }

                        if (req.body.roles.includes("distributor")) {
                            // create a customer with recently created userId
                            console.log("XXX created a distributor: ", req.body.roles.includes("distributor"));

                            User.findOne({ username: { $in: req.body.username } }, (err, userObject) => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }
                                console.log("XXX Created UserId: ", [userObject._id]);
                                distributor._userId = [userObject._id];
                                distributor.save(err => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }

                                    res.send({ message: "Distributor was registered successfully!" });
                                });
                            });

                        }

                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        //res.send({ message: "User was registered successfully!" });
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                console.log("XXX ROLE ID: ", [role._id]);
                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    // create a customer with recently created userId
                    customer.save((err, customer) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        User.findOne({ username: { $in: req.body.username } }, (err, userObject) => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            console.log("XXX Created UserId: ", [userObject._id]);
                            customer._userId = [userObject._id];
                            customer.save(err => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }

                                // res.send({ message: "Customer was registered successfully!" });
                            });
                        });
                    });

                    res.send({ message: "User was registered successfully!" });
                });
            });


        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};

exports.changePassword = (req, res) => {
    User.findOneAndUpdate({
        username: req.body.username
    },
    {$set: 
        { 
            password: bcrypt.hashSync(req.body.password, 8)
        }
    }).then(user => res.status(200).send(user))
    .catch((error) => res.status(404).send(error));
};