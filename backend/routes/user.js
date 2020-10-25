
/*jshint esversion: 6 */
const UserOwner = require('../database/models/user.js');
const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require("../utils/Auth");

var express = require('express');
var UserRouter = express.Router();

// user registration route
UserRouter.post("/register-customer", async (req, res) => {
    await userRegister(req.body, "customer", res);
});
// salon owner registration route
UserRouter.post("/register-salonOwner", async (req, res) => {
    await userRegister(req.body, "salon_owner", res);
});
// admin registration route
UserRouter.post("/register-admin", async (req, res) => {
    await userRegister(req.body, "admin", res);
});
// user login route
UserRouter.post("/login-customer", async (req, res) => {
    await userLogin(req.body, "customer", res);
});
// salon owner login route
UserRouter.post("/login-salonOwner", async (req, res) => {
    await userLogin(req.body, "salon_owner", res);
});
// admin login route
UserRouter.post("/login-admin", async (req, res) => {
    await userLogin(req.body, "admin", res);
});
// profile route
UserRouter.get('/profile', userAuth, async (req, res) => {
    console.log(req.user);
    return res.json(serializeUser(req.user));
});
// user protected route
UserRouter.get(
    "/customer-protected",
    userAuth,
    checkRole(["customer"]),
    async (req, res) => {
        return res.json("Hello Customer");
    }
);
// salon owner protected route
UserRouter.get(
    "/salonOwner-protected",
    userAuth,
    checkRole(["salonOwner"]),
    async (req, res) => {
        return res.json("Hello salonOwner");
    }
);
// admin protected route
UserRouter.get(
    "/admin-protected",
    userAuth,
    checkRole(["admin"]),
    async (req, res) => {
        return res.json("Hello Admin");
    }
);

// test with 2 roles
UserRouter.get(
    "/salonOwner-protected-and-admin-protected",
    userAuth,
    checkRole(["salonOwner", "admin"]),
    async (req, res) => {
        return res.json("salonOwner and Admin");
    }
);
module.exports = UserRouter;