
/*jshint esversion: 6 */
const UserOwner = require('../database/models/user.js');
const { userRegister} = require("../utils/Auth");

var express = require('express');
var UserRouter = express.Router();

// user registration route
UserRouter.post("/register-customer",async (req, res) => {
   await userRegister(req.body, "customer", res);
});
// salon owner registration route
UserRouter.post("/register-salonOwner",async (req, res) => {
    await userRegister(req.body, "salon_owner", res);
});
// admin registration route
UserRouter.post("/register-admin",async (req, res) => {
    await userRegister(req.body, "admin", res);
});
// user login route
UserRouter.post("/login-customer",async (req, res) => {
   
});
// salon owner login route
UserRouter.post("/login-salonOwner",async (req, res) => {
   
});
// admin login route
UserRouter.post("/login-admin",async (req, res) => {
   
});
// profile route
UserRouter.get('profile', async (req, res) => {});
// user protected route
UserRouter.post("/customer-protected",async (req, res) => {
   
});
// salon owner protected route
UserRouter.post("/salonOwner-protected",async (req, res) => {
   
});
// admin protected route
UserRouter.post("/admin-protected",async (req, res) => {
   
});
module.exports = UserRouter;