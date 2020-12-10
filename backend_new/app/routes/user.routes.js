// Authorization:

// GET /api/test/all
// GET /api/test/user for loggedin users (user/moderator/admin)
// GET /api/test/mod for moderator
// GET /api/test/admin for admin
const express = require('express');
const {success, error} = require("consola");
const bodyParser = require('body-parser');
const cors = require("cors");

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const customerRoutes = require('../controllers/customer.controller');
const salonOwnerRoutes = require('../controllers/salonOwner.controller');
const salonRoutes = require('../controllers/salon.controller');
const distributorRoutes = require('../controllers/distributor.controller');
const barberRoutes = require('../controllers/barber.controller');
const bookingRoutes = require('../controllers/booking.controller');
const productRoutes = require('../controllers/product.controller');
//const passport = require("passport");

//require("./utils/passport")(passport);
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/api/test/salon_owner",
        [authJwt.verifyToken, authJwt.isSalonOwner],
        controller.salonOwnerBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );

    app.get(
        "/api/test/distributor",
        [authJwt.verifyToken, authJwt.isDistributor],
        controller.distributorBoard
    );

    app.use('/salonOwners',     salonOwnerRoutes);
    app.use('/salons',          salonRoutes);
    app.use('/customers',       customerRoutes);
    app.use('/distributors',    distributorRoutes);
    app.use('/barbers',         barberRoutes);
    app.use('/bookings',        bookingRoutes);
    app.use('/products',        productRoutes);


    app.use(express.json());
    app.use('/uploads', express.static('uploads'));
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    app.use(cors());
    //app.use(passport.initialize());
};